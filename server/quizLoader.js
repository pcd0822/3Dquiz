import axios from 'axios';
import { parse } from 'csv-parse/sync';

// Default Demo Sheet (You can replace this with your own published CSV link)
// This is a placeholder link. You should replace it with the real one.
const DEFAULT_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_example_sheet_id/pub?output=csv';

// Fallback data if sheet fails (for testing/demo)
const FALLBACK_QUIZZES = [
    {
        id: 'q1',
        question: "가장 지루한 중학교는?",
        options: ["로딩중", "부재중", "영업중", "회의중"],
        answer: "로딩중", // Should be the text of the answer
        type: "MULTIPLE_CHOICE"
    },
    {
        id: 'q2',
        question: "왕이 넘어지면?",
        options: [],
        answer: "킹콩",
        type: "DESCRIPTIVE"
    }
];

export async function loadQuizzes(sheetUrl = DEFAULT_SHEET_URL) {
    try {
        console.log(`Fetching quizzes from: ${sheetUrl}`);
        const response = await axios.get(sheetUrl);
        const csvData = response.data;

        const records = parse(csvData, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        });

        // Map and transform
        const quizzes = records.map((record, index) => {
            const options = [
                record.option1,
                record.option2,
                record.option3,
                record.option4
            ].filter(opt => opt && opt.trim() !== '');

            const type = options.length > 0 ? "MULTIPLE_CHOICE" : "DESCRIPTIVE";

            return {
                id: `q_${index + 1}`,
                question: record.question,
                options: options,
                answer: record.answer, // Assumed to be the text value
                type: type
            };
        });

        console.log(`Loaded ${quizzes.length} quizzes from Sheet.`);
        return quizzes;

    } catch (error) {
        console.error("Failed to load quizzes from Sheet. Using fallback data.", error.message);
        return FALLBACK_QUIZZES;
    }
}
