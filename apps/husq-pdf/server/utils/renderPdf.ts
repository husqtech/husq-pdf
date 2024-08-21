import puppeteer from "puppeteer";

export const renderPdf = async (url: string, documentProps: any): Promise<Buffer> => {
    let localStorage: any;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulateMediaFeatures([
        {
            name: 'prefers-color-scheme',
            value: 'light',
        },
    ]);
    await page.evaluateOnNewDocument((documentProps) => {
        localStorage.setItem('document_props', JSON.stringify(documentProps));
    }, documentProps);

    const response = await page.goto(url, { waitUntil: "networkidle0" });

    if (response!.status() === 404) {
        await browser.close();
        throw new Error("Document not found (404)");
    }

    const pdfBuffer = await page.pdf({
        preferCSSPageSize: true,
    });

    await browser.close();
    return pdfBuffer;
};
