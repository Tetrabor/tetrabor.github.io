const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const puppeteer = require('puppeteer');
const HTMLtoDOCX = require('html-to-docx');

// Setup theme color palettes
const THEMES = {
  slate: {
    primary: '#334155', // Slate Navy
    secondary: '#64748b',
    border: '#cbd5e1',
    text: '#1e293b'
  },
  charcoal: {
    primary: '#212529', // Charcoal
    secondary: '#495057',
    border: '#ced4da',
    text: '#212529'
  },
  navy: {
    primary: '#1b365d', // Dark Blue
    secondary: '#3a506b',
    border: '#cbd5e1',
    text: '#0b132b'
  }
};

// Parse command line arguments
let selectedTheme = 'charcoal'; // default theme
const args = process.argv.slice(2);
if (args.includes('--slate') || args.includes('-slate')) {
  selectedTheme = 'slate';
} else if (args.includes('--navy') || args.includes('-navy')) {
  selectedTheme = 'navy';
} else if (args.includes('--charcoal') || args.includes('-charcoal')) {
  selectedTheme = 'charcoal';
}

const theme = THEMES[selectedTheme];
console.log(`Using theme: ${selectedTheme.toUpperCase()} (Primary: ${theme.primary})`);

// Define paths
const rootDir = path.join(__dirname, '..');
const resumeMdPath = path.join(rootDir, 'docs', 'Resume', 'Resume.md');
const outputDir = path.join(rootDir, '.resumes');
const pdfOutputPath = path.join(outputDir, `Resume${selectedTheme !== 'charcoal' ? '-' + selectedTheme : ''}.pdf`);
const docxOutputPath = path.join(outputDir, `Resume${selectedTheme !== 'charcoal' ? '-' + selectedTheme : ''}.docx`);

// Main logic
async function run() {
  try {
    // 1. Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 2. Read Markdown
    if (!fs.existsSync(resumeMdPath)) {
      throw new Error(`Resume source file not found at ${resumeMdPath}`);
    }
    let markdown = fs.readFileSync(resumeMdPath, 'utf8');

    // 3. Preprocess Markdown
    // Remove Docusaurus frontmatter
    markdown = markdown.replace(/^---\r?\n([\s\S]*?)\r?\n---/, '');
    
    // Remove Docusaurus header anchors, e.g. ### Summary {#summary} -> ### Summary
    markdown = markdown.replace(/\s*{#\w+}/g, '');

    // Remove horizontal rules (---)
    markdown = markdown.replace(/^---\s*$/gm, '');

    // Process the centered text block specifically (e.g. Michael Sheleman block)
    // Docusaurus uses: <div className="text--center"> # Title ... </div>
    // We match this and convert to standard HTML structure
    markdown = markdown.replace(/<div className="text--center">([\s\S]*?)<\/div>/gi, (match, p1) => {
      let inner = p1.trim();
      // Replace header markdown `# Michael Sheleman` with h1
      inner = inner.replace(/^#\s+(.+)$/m, '<h1>$1</h1>');
      
      // Split remaining lines
      const lines = inner.split('\n').map(l => l.trim()).filter(Boolean);
      let html = '<div class="text-center">';
      for (const line of lines) {
        if (line.startsWith('<h1>')) {
          html += line;
        } else {
          // Convert markdown links [text](url) to HTML <a> tags
          let processedLine = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
          // Also linkify raw emails and URLs if needed
          processedLine = processedLine.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g, '<a href="mailto:$1">$1</a>');
          html += `<p class="header-contact">${processedLine}</p>`;
        }
      }
      html += '</div>';
      return html;
    });

    // 4. Convert Markdown to HTML
    const mainHtmlContent = marked(markdown);

    // 5. Generate PDF using Puppeteer
    const pdfHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Resume - Michael Sheleman</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            color: ${theme.text};
            line-height: 1.5;
            margin: 0;
            padding: 0;
            font-size: 13px;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
          }
          a {
            color: ${theme.primary};
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .text-center {
            text-align: center;
            margin-bottom: 20px;
          }
          .text-center h1 {
            font-size: 28px;
            margin: 0 0 8px 0;
            color: ${theme.primary};
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .header-contact {
            margin: 4px 0;
            font-size: 13px;
            color: ${theme.secondary};
            font-weight: 400;
          }
          hr {
            display: none;
          }
          h2, h3 {
            font-size: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: ${theme.primary};
            margin-top: 25px;
            margin-bottom: 10px;
            font-weight: 600;
            border-bottom: 2px solid ${theme.primary};
            padding-bottom: 4px;
            page-break-after: avoid;
          }
          h4 {
            font-size: 14px;
            color: ${theme.text};
            margin-top: 15px;
            margin-bottom: 4px;
            font-weight: 600;
            page-break-after: avoid;
          }
          h5 {
            font-size: 12px;
            color: ${theme.secondary};
            margin-top: 0;
            margin-bottom: 8px;
            font-weight: 500;
            font-style: italic;
            page-break-after: avoid;
          }
          ul {
            margin-top: 5px;
            margin-bottom: 15px;
            padding-left: 20px;
          }
          li {
            margin-bottom: 5px;
            line-height: 1.4;
          }
          p {
            margin-top: 5px;
            margin-bottom: 15px;
          }
          /* Prevent page-breaks in the middle of a job or block */
          .experience-block, li, p, h4, h5 {
            page-break-inside: avoid;
          }
          @media print {
            body {
              font-size: 12px;
              color: #000;
            }
            .text-center h1 {
              color: ${theme.primary} !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            h3 {
              color: ${theme.primary} !important;
              border-bottom-color: ${theme.primary} !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            a {
              color: ${theme.primary} !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${mainHtmlContent}
        </div>
      </body>
      </html>
    `;

    console.log('Generating PDF...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(pdfHtml, { waitUntil: 'networkidle0' });
    
    // Save to PDF
    await page.pdf({
      path: pdfOutputPath,
      format: 'Letter',
      margin: {
        top: '0.6in',
        right: '0.6in',
        bottom: '0.6in',
        left: '0.6in'
      },
      printBackground: true
    });
    await browser.close();
    console.log(`✓ PDF successfully saved to ${pdfOutputPath}`);

    // 6. Generate DOCX using html-to-docx
    console.log('Generating DOCX...');
    
    // Process HTML for DOCX to ensure compatibility and color matching
    // We add inline styling so Word recognizes the colors
    let docxHtml = mainHtmlContent;
    
    // Wrap header block content
    docxHtml = docxHtml.replace(/<div class="text-center">([\s\S]*?)<\/div>/gi, (match, p1) => {
      let inner = p1.trim();
      inner = inner.replace(/<h1>(.*?)<\/h1>/gi, `<h1 style="text-align: center; color: ${theme.primary}; font-family: Arial; font-size: 24pt;">$1</h1>`);
      inner = inner.replace(/<p class="header-contact">([\s\S]*?)<\/p>/gi, `<p style="text-align: center; color: ${theme.secondary}; font-family: Arial; font-size: 10pt; margin: 2pt 0;">$1</p>`);
      return `<div>${inner}</div>`;
    });

    // Style the headings
    docxHtml = docxHtml.replace(/<h[23]>(.*?)<\/h[23]>/gi, `<h3 style="color: ${theme.primary}; font-family: Arial; font-size: 14pt; border-bottom: 2px solid ${theme.primary}; padding-bottom: 3pt; margin-top: 18pt; text-transform: uppercase;">$1</h3>`);
    docxHtml = docxHtml.replace(/<hr\s*\/?>/gi, '');
    docxHtml = docxHtml.replace(/<h4>(.*?)<\/h4>/gi, `<h4 style="color: ${theme.text}; font-family: Arial; font-size: 11pt; font-weight: bold; margin-top: 10pt; margin-bottom: 2pt;">$1</h4>`);
    docxHtml = docxHtml.replace(/<h5>(.*?)<\/h5>/gi, `<h5 style="color: ${theme.secondary}; font-family: Arial; font-size: 10pt; font-style: italic; margin-top: 0; margin-bottom: 6pt;">$1</h5>`);
    
    // Style lists and paragraphs
    docxHtml = docxHtml.replace(/<li>(.*?)<\/li>/gi, `<li style="font-family: Arial; font-size: 10pt; margin-bottom: 3pt;">$1</li>`);
    docxHtml = docxHtml.replace(/<p>(.*?)<\/p>/gi, `<p style="font-family: Arial; font-size: 10pt; line-height: 1.3; margin-bottom: 6pt;">$1</p>`);

    // Wrap in standard basic document template
    const docxBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        ${docxHtml}
      </body>
      </html>
    `;

    const docxBuffer = await HTMLtoDOCX(docxBody, null, {
      orientation: 'portrait',
      pageSize: 'letter',
      margins: {
        top: 864, // 0.6 in dxa (1 inch = 1440 dxa, 0.6 inch = 864 dxa)
        right: 864,
        bottom: 864,
        left: 864
      }
    });

    fs.writeFileSync(docxOutputPath, docxBuffer);
    console.log(`✓ DOCX successfully saved to ${docxOutputPath}`);
    console.log('\nExport completed successfully!');

  } catch (error) {
    console.error('Error during export process:', error);
    process.exit(1);
  }
}

run();
