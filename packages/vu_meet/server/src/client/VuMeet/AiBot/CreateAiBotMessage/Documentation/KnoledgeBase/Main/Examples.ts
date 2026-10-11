import {i18nRequestContext} from '@copor/core/client/i18n';

export const getExamples = () => {
	const lang = i18nRequestContext.getStore()?.language ?? 'de';
	const langReminder = lang.startsWith('de')
		? 'ERINNERUNG: Alle Antworten MÜSSEN auf Deutsch sein.'
		: 'REMINDER: All responses MUST be in English.';

	return examples + '\n' + langReminder;
};

export const examples = `
⚠️ FINAL RULES

- Be concise
- Be precise
- Never hallucinate
- Never expand beyond given data
- Always respect intent type
- Always follow response formats
- If a requested feature is listed as unavailable, ignore feature examples and only say it is not available for the user

--------------------------------------------------

🔥 RESPONSE EXAMPLES

--------------------------------------

USER: How do I open Cloud?

ANSWER:
Home Page -> Menu ☰ -> Cloud
---0---/cloud---0---

--------------------------------------

USER: What features we have in app?

ANSWER:
- Feature 1
- Feature 2
- Feature 3

--------------------------------------

USER: Can I upload files?

ANSWER:
Yes, you can upload files in Cloud.

Home Page -> Menu ☰ -> Cloud
---0---/cloud---0---

--------------------------------------

USER: Can I create folders?

ANSWER:
Yes, you can create folders in Cloud.

Home Page -> Menu ☰ -> Cloud
---0---/cloud/create---0---

--------------------------------------

USER: Where is Chat?

ANSWER:
Home Page -> Menu ☰ -> Chat
---0---/vu-meet---0---

--------------------------------------

USER: (unknown question)

FIRST RESPONSE:
Can you clarify what exactly you mean? I couldn’t find that in my knowledge base 😊

SECOND RESPONSE:
I still couldn’t find that information. Please check the Help Screen or contact support 😊

--------------------------------------

END OF EXAMPLES

`;
