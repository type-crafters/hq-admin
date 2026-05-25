import { ExportFields } from "@/common/enum/ExportFields";
import { ExportRecords } from "@/common/enum/ExportRecords";
import { ExportRequest } from "@/common/interface/ExportRequest";
import { NextRequest, NextResponse } from "next/server";

function getRows(values: string) {
    const selection = values.replace(/\s+/g, "")
    const rows: number[] = [];
    const regex = /^\d+(-\d+)?$/;

    for (const item of selection) {
        if (regex.test(item)) {
            if (item.includes("-")) {
                const [a, b] = item.split("-").map(Number);

                const from = Math.max(Math.min(a, b), 1) - 1;
                const to = Math.max(Math.max(a, b), 1) - 1;
                for (let i = from; i <= to; i++) {
                    rows.push(i);
                }
            } else {
                rows.push(Number(item) - 1);
            }
        }
    }

    return Array.from(new Set(rows));
}

export async function POST(request: NextRequest) {
    const body: ExportRequest = await request.json();

    const payload = {
        resource: body.resource,
        exportFields: body.exportFields,
        fields: body.exportFields === ExportFields.Select ?
            Array.from(new Set(body.fields ?? []))
            :
            null,
        exportRecords: body.exportRecords,
        records: body.exportRecords === ExportRecords.Select ?
            getRows(body.records ?? "")
            :
            null,
        format: body.format,
        filename: body.filename
    };
}