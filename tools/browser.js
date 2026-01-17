import { JSDOM } from 'jsdom';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

let browser;

async function initBrowser() {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox']
        });
    }
    return browser;
}

const MAX_CONCURRENT_PAGES = 5;
let activePages = 0;
const waiting = [];

async function acquirePage() {
    if (activePages >= MAX_CONCURRENT_PAGES) {
        await new Promise(resolve => waiting.push(resolve));
    }
    activePages++;
    const browser = await initBrowser();
    return await browser.newPage();
}

async function releasePage(page) {
    activePages--;
    try {
        if (page) await page.close();
    } catch (e) {
        console.error("Error closing page", e);
    }
    
    if (waiting.length > 0) {
        const next = waiting.shift();
        next();
    }
}

export async function getDOM(link) {
    const page = await acquirePage();
    try {
        // Set a realistic user agent
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
        
        await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 60000 });
        
        // Wait for Cloudflare challenge to pass
        // We expect a JSON response, so we wait until the body text is valid JSON.
        try {
            await page.waitForFunction(() => {
                const text = document.body.innerText;
                // Basic check: starts with { and likely ends with }
                if (!text || !text.trim().startsWith('{')) return false;
                try {
                    JSON.parse(text);
                    return true;
                } catch {
                    return false;
                }
            }, { timeout: 30000 });
        } catch (e) {
            console.log("Timeout waiting for JSON on " + link + ", checking page content...");
        }

        // Extract the JSON content from the body
        const content = await page.evaluate(() => document.body.innerText);
        
        let dataJSON;
        try {
            dataJSON = JSON.parse(content);
        } catch (e) {
            console.error("Failed to parse JSON from " + link);
             // Verify if we got cloudflare challenge page
             const title = await page.title();
             console.error("Page title:" + title);
             throw e;
        }

        if (dataJSON && dataJSON.parse && dataJSON.parse.text && dataJSON.parse.text["*"]) {
            return new JSDOM(dataJSON.parse.text["*"]);
        } else {
             throw new Error("Unexpected JSON structure from " + link);
        }

    } catch (e) {
        console.error("Could not fetch data from " + link, e);
        throw e;
    } finally {
        await releasePage(page);
    }
}

export async function closeBrowser() {
    if (browser) {
        await browser.close();
        browser = null;
    }
}
