import { ExportFields } from "../enum/ExportFields";
import { ExportFormat } from "../enum/ExportFormat";
import { ExportRecords } from "../enum/ExportRecords";

export interface ExportRequest {
    resource: string;
    exportFields: ExportFields;
    fields?: string[];
    exportRecords: ExportRecords;
    records?: string;
    format: ExportFormat;
    filename: string;
}