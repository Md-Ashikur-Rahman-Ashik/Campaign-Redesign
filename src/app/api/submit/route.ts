import { NextResponse, NextRequest } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library'; 

// Configuration constants from environment variables
const DOC_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!DOC_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    console.error('Missing Google Sheet credentials. Cannot configure authentication.');
}

// 2. Create the JWT service account client once outside the handler for reuse/performance
let auth: JWT | null = null;
if (CLIENT_EMAIL && PRIVATE_KEY) {
    auth = new JWT({
        email: CLIENT_EMAIL,
        key: PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Required scope
    });
}
// ----------------------

export async function POST(req: NextRequest) {
  // Check for configuration errors before proceeding
  if (!DOC_ID || !auth) {
    return NextResponse.json({ error: 'Server misconfiguration: Google credentials missing or invalid.' }, { status: 500 });
  }

  const { message } = await req.json(); 

  if (!message) {
    return NextResponse.json({ error: 'Message field is required.' }, { status: 400 });
  }

  try {
    const doc = new GoogleSpreadsheet(DOC_ID, auth); 

    
    // Load sheet info and first sheet
    await doc.loadInfo(); 
    const sheet = doc.sheetsByIndex[0];

    // Append the new row
    const rowData = {
      Timestamp: new Date().toLocaleString(),
      Message: message,
    };
    
    await sheet.addRow(rowData);

    // Success response
    return NextResponse.json({ success: true, message: 'Feedback saved.' }, { status: 200 });

  } catch (error) {
    console.error('Error saving to Google Sheet:', error);
    // Error response
    return NextResponse.json({ 
      error: 'Failed to save feedback.', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
    return NextResponse.json({ error: 'GET method not allowed on this endpoint.' }, { status: 405 });
}