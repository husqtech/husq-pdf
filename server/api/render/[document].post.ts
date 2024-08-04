import { renderPdf } from "~/server/utils/renderPdf";

export default defineEventHandler(async (event) => {
    try {
        const document = getRouterParam(event, "document");
        const body = await readBody(event);

        if (!document) {
            setResponseStatus(event, 400);
            return { error: "document name is required" };
        }
        const documentPath = `http://localhost:3000/${document}`;

        console.log(body)

        const pdfBuffer = await renderPdf(documentPath, body);


        setResponseHeaders(event, {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${document}.pdf"`,
        });

        return send(event, pdfBuffer);
    } catch (error) {
        console.error(error);
        setResponseStatus(event, 500);
        return { error: "Failed to generate PDF" };
    }
});