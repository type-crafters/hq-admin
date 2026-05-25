import { KeyboardEvent, Dispatch, JSX, SetStateAction, SyntheticEvent, useState, ChangeEvent, useMemo, SubmitEvent } from "react";
import Dialog from "./Dialog";
import { ExportFields } from "@/common/enum/ExportFields";
import Input from "./Input";
import { ExportFormat } from "@/common/enum/ExportFormat";
import { ExportRecords } from "@/common/enum/ExportRecords";
import Toast from "./Toast";
import { OptionalToastContent } from "@/common/interface/ToastContent";
import { ExportRequest } from "@/common/interface/ExportRequest";

interface ExportDialogProps {
    id?: string;
    resource: string;
    open: boolean;
    entities: Array<object>;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ExportDialog({
    id,
    resource,
    open,
    entities,
    setOpen
}: ExportDialogProps): JSX.Element {
    const [toast, setToast] = useState<OptionalToastContent>({});
    const [enabled, setEnabled] = useState(true);
    const [exportFields, setExportFields] = useState<ExportFields | null>(null);
    const [exportRecords, setExportRecords] = useState<ExportRecords | null>(null);
    const [fieldSet, setFieldSet] = useState<Set<string>>(new Set());
    const [newField, setNewField] = useState<string>("");
    const maxKeys = useMemo(() => {
        if (!entities.length) {
            return [];
        }

        const largestEntity = entities.toSorted((e1, e2) => {
            return Object.keys(e2 ?? {}).length - Object.keys(e1 ?? {}).length;
        })[0];

        return Object.keys(largestEntity ?? {});
    }, [entities]);

    const [records, setRecords] = useState<string>("");
    const [format, setFormat] = useState<ExportFormat | null>(null);
    const [filename, setFilename] = useState("");

    const resetExportRequest = (event?: SyntheticEvent) => {
        if (event) event.preventDefault();

        setExportFields(null);
        setFieldSet(new Set());
        setRecords("");
        setFormat(null);
        setFilename("");

        setOpen(false);
    }

    const submitExportRequest = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const vError = "Validation error";

        if (!exportFields) {
            setToast({ title: vError, message: "Please choose whether to export all or select fields." });
            setOpen(false);
            return;
        }

        if (exportFields === ExportFields.Select && !fieldSet.size) {
            setToast({ title: vError, message: "Please select at least one field to export." });
            setOpen(false);
            return;
        }

        if (!exportRecords) {
            setToast({ title: vError, message: "Please choose whether to export all or select records." });
            setOpen(false);
            return;
        }

        if (exportRecords === ExportRecords.Select && !records.trim()) {
            setToast({ title: vError, message: "Please select at least one record or range to export." });
            setOpen(false);
            return;
        }

        if (!format) {
            setToast({ title: vError, message: "Please choose an export format." });
            setOpen(false);
            return;
        }

        if (!filename.trim()) {
            setToast({ title: vError, message: "Please set a name for the downloadable file." });
            setOpen(false);
            return;
        }

        setEnabled(false);
        fetch("/api/exports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                resource,
                exportFields,
                exportRecords,
                format,
                filename
            } satisfies ExportRequest)
        })
            .then((response) => {
                resetExportRequest();
            })
            .catch(error => {
                setToast({ title: "Error", message: error.message })
            })
            .finally(() => {
                setEnabled(true);
            });
    }

    const addFieldOnEnter = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addField();
        }
    }

    const addDefaultField = (event: ChangeEvent<HTMLInputElement>, key: string) => {
        setFieldSet(s => {
            const next = new Set(s);

            if (event.currentTarget.checked) {
                next.add(key);
            } else {
                next.delete(key);
            }

            return next;
        });
    }

    const addField = () => {
        const trimmed = newField.trim();

        if (trimmed) {
            setFieldSet(s => new Set([...s, trimmed]));
            setNewField("");
        }
    }

    const removeField = (value: string) => {
        setFieldSet(s => {
            const next = new Set(s);
            next.delete(value);
            return next;
        });
    };

    return (
        <>
            <Toast content={toast} setContent={setToast} />
            <Dialog id={id} open={open} setOpen={setOpen}>
                <form onSubmit={submitExportRequest} onReset={resetExportRequest} className="contents">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold">Export data</h2>
                            <p className="opacity-60">Customize your export with the options below</p>
                        </div>
                        <div className="space-y-6 max-h-160 p-2 overflow-y-auto custom-scroll">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Fields</h3>
                                <div className="flex gap-4 items-stretch">
                                    {Object.entries(ExportFields).map(([key, value]) => (
                                        <label className="group block flex-1" key={key}>
                                            <input
                                                type="radio"
                                                name="exportFields"
                                                value={key}
                                                className="hidden"
                                                checked={exportFields === value}
                                                onChange={() => setExportFields(value)}
                                            />
                                            <div role="presentation" className="flex gap-4 items-center">
                                                <div className="size-4 rounded-full border border-zinc-500 flex justify-center items-center">
                                                    <div className="size-2 bg-indigo-500 rounded-full scale-0 group-has-checked:scale-100 duration-150"></div>
                                                </div>
                                                <p>{value}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className={`${exportFields === ExportFields.Select ? "h-auto" : "h-0"} overflow-hidden interpolate-keywords duration-400`}>
                                {exportFields === ExportFields.Select && (
                                    <div className="space-y-4 p-1">
                                        <h3 className="text-lg font-semibold">Select fields</h3>
                                        <ul className="flex flex-col gap-4 items-stretch">
                                            {maxKeys.map((key, i) => (
                                                <label className="group flex gap-4" htmlFor={`fields-${key}`} key={i}>
                                                    <input
                                                        type="checkbox"
                                                        name="fields"
                                                        id={`fields-${key}`}
                                                        className="hidden"
                                                        checked={fieldSet.has(key)}
                                                        onChange={(e) => addDefaultField(e, key)}
                                                    />
                                                    <div className="size-5 rounded flex justify-center items-center border border-zinc-500">
                                                        <i className="bi bi-check-lg scale-0 group-has-checked:scale-100 duration-150"></i>
                                                    </div>
                                                    <p>{key}</p>
                                                </label>
                                            ))}
                                        </ul>
                                        <h4 className="font-semibold opacity-80 flex gap-2">
                                            Custom fields
                                        </h4>
                                        <p className="opacity-60">
                                            Some fields may not appear in the list above.
                                            Add them manually below to include them in the export.
                                            <br />
                                            <b>Note:</b> Fields that do not exist will still be added as columns,
                                            with their values set to <code>null</code>.
                                        </p>
                                        <div className="flex gap-2">
                                            <Input
                                                type="text"
                                                id="additionalFields"
                                                placeholder="Add a custom field..."
                                                state={newField}
                                                onKeyDown={addFieldOnEnter}
                                                setState={setNewField}
                                            />
                                            <button
                                                type="button"
                                                className="rounded px-2 bg-indigo-500 hover:bg-indigo-600 duration-150 text-white"
                                                onClick={addField}
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <ul className="w-full space-y-2">
                                            {Array.from(fieldSet).map((f, i) => (
                                                <li key={i} className="flex gap-4 items-center p-2 rounded hover:bg-zinc-800/50 duration-150">
                                                    <p className="flex-1">{f}</p>
                                                    <button
                                                        type="button"
                                                        aria-label={`Clear '${f}'`}
                                                        onClick={() => removeField(f)}
                                                    >
                                                        <i className="bi bi-x-lg"></i>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Records</h3>
                                <div className="flex gap-4 items-stretch">
                                    {Object.entries(ExportRecords).map(([key, value]) => (
                                        <label className="group block flex-1" key={key}>
                                            <input
                                                type="radio"
                                                name="exportRecords"
                                                value={key}
                                                className="hidden"
                                                checked={exportRecords === value}
                                                onChange={() => setExportRecords(value)}
                                            />
                                            <div role="presentation" className="flex gap-4 items-center">
                                                <div className="size-4 rounded-full border border-zinc-500 flex justify-center items-center">
                                                    <div className="size-2 bg-indigo-500 rounded-full scale-0 group-has-checked:scale-100 duration-150"></div>
                                                </div>
                                                <p>{value}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className={`${exportRecords === ExportRecords.Select ? "h-auto" : "h-0"} overflow-hidden interpolate-keywords duration-400 p-1`}>
                                {exportRecords === ExportRecords.Select && (
                                    <>
                                        <h3 className="text-lg font-semibold">Records</h3>
                                        <p className="opacity-60">
                                            Set a comma-separated list of individual row numbers and ranges.
                                        </p>
                                        <Input
                                            type="text"
                                            id="records"
                                            state={records}
                                            setState={setRecords}
                                        />
                                    </>
                                )}
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Format</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(ExportFormat).map(([key, value]) => (
                                        <label className="block flex-1" key={key}>
                                            <input type="radio" name="exportFormat" value={key} checked={format === value} onChange={() => setFormat(value)} className="hidden peer" />
                                            <div role="presentation" className="flex-1 text-xl text-center py-6 border border-zinc-500 outline-2 outline-transparent hover:outline-white peer-checked:outline-indigo-500! rounded-lg duration-150 cursor-pointer">
                                                {key}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className={`${format ? "h-auto" : "h-0"} interpolate-keywords duration-200`}>
                                {format && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">Export as</h3>
                                        <div className="flex gap-4 items-stretch">
                                            <div className="flex gap-2 border border-zinc-500 px-2 py-1 w-full rounded bg-zinc-800/60">
                                                <input
                                                    type="text"
                                                    name="filename"
                                                    id="filename"
                                                    value={filename}
                                                    onChange={(e) => setFilename(e.currentTarget.value)}
                                                    className="flex-1 focus:outline-none"
                                                />
                                                <div>
                                                    .{format}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full flex justify-end items-center gap-4">
                            <input
                                type="reset"
                                value="Cancel"
                                className="bg-zinc-500 px-3 py-2 rounded hover:bg-zinc-600 duration-150 disabled:bg-zinc-400"
                                disabled={!enabled}
                            />
                            <input
                                type="submit"
                                value="Export"
                                className="bg-indigo-500 px-3 py-2 rounded hover:bg-indigo-600 duration-150 disabled:bg-zinc-400"
                                disabled={!enabled}
                            />
                        </div>
                    </div>
                </form>
            </Dialog>
        </>
    );
}