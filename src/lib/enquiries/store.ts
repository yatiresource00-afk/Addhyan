import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { StoredEnquiry } from "@/types/enquiry";

export interface EnquiryRepository {
  create(enquiry: Omit<StoredEnquiry, "id" | "createdAt">): Promise<StoredEnquiry>;
}

const filePath = path.join(process.cwd(), "data", "enquiries.json");

async function readAll(): Promise<StoredEnquiry[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as StoredEnquiry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const fileEnquiryRepository: EnquiryRepository = {
  async create(enquiry) {
    const record: StoredEnquiry = {
      ...enquiry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const existing = await readAll();
    existing.push(record);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(existing, null, 2), "utf8");
    return record;
  },
};
