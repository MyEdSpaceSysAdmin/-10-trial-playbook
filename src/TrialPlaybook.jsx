import { useState } from "react";

// ─── BRAND TOKENS ────────────────────────────────────────────────
const C = {
  blue: "#3533ff",
  green: "#b1db00",
  light: "#a3e1f0",
  dark: "#101626",
  white: "#ffffff",
};

const T = {
  h1: { fontFamily: "Inter, sans-serif", fontWeight: 900, color: C.white },
  h2: { fontFamily: "Inter, sans-serif", fontWeight: 700 },
  h3: { fontFamily: "Inter, sans-serif", fontWeight: 700 },
  body: { fontFamily: "Inter, sans-serif", fontWeight: 400 },
  label: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
};

const btn = {
  primary: {
    background: C.green,
    color: C.dark,
    border: `2px solid ${C.green}`,
    fontWeight: 700,
    padding: "16px 32px",
    borderRadius: 0,
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  secondary: {
    background: C.blue,
    color: C.white,
    border: `2px solid ${C.blue}`,
    fontWeight: 700,
    padding: "16px 32px",
    borderRadius: 0,
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  ghost: {
    background: "transparent",
    color: C.blue,
    border: `2px solid ${C.blue}`,
    fontWeight: 700,
    padding: "16px 32px",
    borderRadius: 0,
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
};

// ─── TRACK DATA ──────────────────────────────────────────────────

const TRACKS = {
  A: {
    label: "🔴 Never Logged In",
    context:
      "Student hasn't logged in. Automation owns Days 1–5. Rep escalates Day 5+.",
    touches: [
      {
        id: "T1",
        day: "Day 0",
        label: "Welcome",
        channel: "🤖",
        channelFull: "🤖 AUTOMATED",
        goal: "Get them to log in and create their account.",
        repNote: "AUTOMATION — No rep action needed.",
        script: `Hey [Parent Name],

Thank you so much for joining us. We're really excited to have you on board.

Your student account is ready to be set up so you can start learning.

Please log in here: https://go.myedspace.co.uk/login

To access the live lessons, quizzes and revision materials, you first need to create your account and set a password.

You can watch the following video to start getting familiar with our platform: https://www.youtube.com/watch?v=1nH5IbEvB9g

We look forward to seeing you in class!`,
      },
      {
        id: "T1b",
        day: "Day 1",
        label: "Login Nudge",
        channel: "🤖",
        channelFull: "🤖 AUTOMATED",
        goal: "Remind them trial is active, drive first login.",
        repNote: "AUTOMATION — No rep action needed.",
        script: `You've got 9 days left of your trial.

Log in today to explore all the study resources available.

Here is a reminder of what you have access to:
https://intercom-help.eu/myedspace/en/articles/397280-timetables-for-2025-26-academic-year`,
      },
      {
        id: "T1c",
        day: "Day 3",
        label: "One Week Left",
        channel: "🤖",
        channelFull: "🤖 AUTOMATED",
        goal: "Create urgency at the one-week mark.",
        repNote: "AUTOMATION — No rep action needed.",
        script: `One week left to start improving grades

A quick reminder that your trial is active.

Make sure you log in and make the most of it before time runs out!`,
      },
      {
        id: "T1d",
        day: "Day 5",
        label: "Halfway",
        channel: "🤖",
        channelFull: "🤖 AUTOMATED",
        goal: "Surface blockers — offer immediate help.",
        repNote: "AUTOMATION — No rep action needed.",
        script: `You're halfway through your trial and your classes are waiting.

Logged in yet? If anything's blocked you, reply now and I'll fix it straight away.`,
      },
      {
        id: "T1e",
        day: "Day 7",
        label: "Stop Missing Out",
        channel: "🤖",
        channelFull: "🤖 AUTOMATED",
        goal: "Final automated push. 3 days left.",
        repNote: "AUTOMATION — No rep action needed.",
        script: `Stop missing out! 3 days left of your trial.

We haven't seen any login activity yet. If you still want to test this properly you can try it out today.`,
      },
      {
        id: "T3",
        day: "Day 5",
        label: "Escalation Call",
        channel: "📞",
        channelFull: "📞 CALL TWICE FIRST → WhatsApp if no answer",
        goal: "First rep contact for Track A. Surface and fix login blockers.",
        repNote: "Only call if student has still not logged in by Day 5.",
        script: `"Hi, can I speak to [Parent Name]? It's [Your Name] calling from MyEdSpace."

[If yes] "Hi [Parent Name] — I'm just calling because [Student Name]'s trial started a few days ago but we haven't seen them log in yet, and I didn't want you to lose your trial days. Is everything okay with the setup?"

LISTEN — most common issues:
→ Didn't get the email: "No problem, you can head to https://myedspace.co.uk/dashboard and click 'first time logging in'"
→ Too busy: "Totally fine — the trial is active until [end date]. Please login so you are able to see first hand how incredible our courses can be"
→ Changed mind: "I understand — can I ask what put you off? I want to make sure it's not something we can fix for you."

---
VOICEMAIL:
"Hey [Parent Name], it's [Your Name] from MyEdSpace — just calling because [Student Name]'s trial is running but they haven't logged in yet. Don't want you to miss out on the days you've paid for! Give me a call back or just reply to this message and we'll get them set up quickly. Speak soon."`,
      },
      {
        id: "T4",
        day: "Day 7",
        label: "Urgency WhatsApp",
        channel: "💬",
        channelFull: "💬 WhatsApp",
        goal: "Create urgency + surface intent. 'Reply STOP' filters lost leads.",
        repNote:
          "The 'reply STOP to cancel' creates urgency without pressure. It surfaces parents who are genuinely done — don't waste Touch 5 on them.",
        script: `Hey [Parent Name],

[Student Name] has 3 days left on their trial — and hasn't logged in yet.

You're due to roll onto the £180/month plan when the trial ends.

If you'd like to cancel, just reply STOP and I'll take care of it.

But if you still want to give it a go - now's the time. We have live lessons every day this week. Reply and I'll send you today's schedule.`,
      },
      {
        id: "T5",
        day: "Day 10",
        label: "Final Close",
        channel: "📞",
        channelFull: "📞 Call first, then WhatsApp",
        goal: "Close or exit cleanly. Don't over-invest in a Track A who never logged in.",
        repNote:
          "Don't spend a full close attempt on a Track A who never logged in. Goal: get them into B1 or close cleanly.",
        script: `FINAL WHATSAPP:

FINAL NOTICE - DEADLINE TODAY:
[Parent Name], [Student Name]'s trial ended today.

We're closing their account unless you'd like to continue.

If you'd like to keep access going, reply here and I'll set up a call.
Or you can upgrade directly: [link]

Reply STOP to confirm you'd like to cancel. No hard feelings.`,
      },
    ],
  },

  B1: {
    label: "🟡 Logged In, No Lesson",
    context:
      "Logged in but no lesson. Primary goal: get them into a class first. Don't close on price yet.",
    touches: [
      {
        id: "T2",
        day: "Trigger: Login detected → within 24hrs",
        label: "Login Response",
        channel: "💬",
        channelFull: "💬 WhatsApp (rep-sent)",
        goal: "Acknowledge the login. Direct them to their first live lesson. Don't close on price yet.",
        repNote:
          "Warm lead. Don't close on price before they've attended a lesson. Get them to class first.",
        script: `Hey [Parent Name] 👋 — saw [Student Name] has set up their account, nice one!

Quick question: are you exploring the trial to see if the full programme would be right for them?

Their next live lesson is [Subject] on [Day] at [Time].

That's the best place to start — 60 minutes with [Teacher Name] and they'll get a real feel for how it works.

Any questions before then? Happy to help.`,
      },
      {
        id: "T3",
        day: "Day 3–4 (or mid-trial if no lesson)",
        label: "Check-In Call",
        channel: "📞",
        channelFull: "📞 CALL FIRST → WhatsApp if no answer",
        goal: "Remove blockers. Bridge to attending first lesson.",
        repNote: "LISTEN after each question. Don't rush to price.",
        script: `OPENING:
"Hi [Parent Name], it's [Your Name] from MyEdSpace. Have you got two minutes?"
[If yes:]
"Great — I'm just checking in because [Student Name] logged in but hasn't joined a live lesson yet. I wanted to make sure there wasn't anything getting in the way."

DISCOVER — one of these:
→ "Have they had a chance to look at the timetable?"
→ "Is there a subject they're most behind on right now?"
→ "What made you look into extra support for them?"

BRIDGE TO LESSON:
"The best thing I can do for you right now is make sure [Student Name] actually gets into a class — because that's where it clicks. There's a [Subject] lesson today / tomorrow at [Time]. Can we get them in for that one?"

---
VOICEMAIL:
"Hey [Parent Name], [Your Name] from MyEdSpace. Just noticed [Student Name] logged in but hasn't joined a live lesson yet — wanted to check everything's okay and make sure they don't miss out. Give me a call back or text me whenever's good. Speak soon!"

---
WHATSAPP (if no answer on call):
"Hey [Parent Name] — tried to call just now, no worries if it's a bad time.
[Student Name] is all set up but hasn't joined a lesson yet.
There's a [Subject] class [today/tomorrow] at [Time] — that's the best way to get a proper feel for the programme.
Will you be in attendance?"`,
      },
      {
        id: "T4",
        day: "Day 7",
        label: "Time-Based Push",
        channel: "💬",
        channelFull: "💬 WhatsApp",
        goal: "Urgency around trial ending without a lesson attended.",
        repNote: null,
        script: `Hey [Parent Name],

[Student Name] has 3 days left of their trial — and they haven't attended a live lesson yet.

The trial is designed around the live classes - that's the core of what you're testing. Without attending one, you won't really know if it's right for them.

There's still time: [Subject] lesson on [Day] at [Time].

Are you able to attend?`,
      },
      {
        id: "T5",
        day: "Day 10",
        label: "Final Close",
        channel: "📞",
        channelFull: "📞 Call + 💬 WhatsApp",
        goal: "Last attempt. Push to lesson or close on what they've seen.",
        repNote: null,
        script: `OPENING:
"Hi [Parent Name], [Your Name] from MyEdSpace. [Student Name]'s trial ends today — I wanted to call before it closes."

IF THEY ATTENDED A LESSON: → Switch to B2 close script.

IF STILL NO LESSON ATTENDED:
"I know they haven't made it into a live class yet but maybe you had a chance to explore our award-winning learning platform?"
[If agreed — flag for Sean/manager to approve extension]

IF THEY WANT TO CANCEL:
"I completely understand. Can I ask — was it the setup, the timing, or something about what you saw that put you off?"
[Log reason in CRM — do not push further]

---
FINAL WHATSAPP:
"Hey [Parent Name],
[Student Name]'s trial ends today.
They haven't attended a live lesson yet — which means you haven't really seen what you're buying. That's not a great position to make a decision from.
If you'd like to upgrade and give it a proper go, reply here.

Full year: £749.55 upfront (or 3x £263)
Monthly: £180/month - cancel anytime
14-day money-back guarantee on all plans.

Reply STOP if you'd prefer to cancel. No worries at all."`,
      },
    ],
  },

  B2: {
    label: "🟢 Attended 1+ Lessons — CLOSE",
    context:
      "Has attended a lesson. Behavioural hooks are active. Lead with annual upfront. The sale starts when they object.",
    touches: [
      {
        id: "T3",
        day: "Trigger: First lesson attended → call next morning",
        label: "Post-Lesson Close",
        channel: "📞",
        channelFull: "📞 CALL FIRST → WhatsApp if no answer",
        goal: "Close on annual upfront. This is the prime conversion moment. Lead with annual. The sale starts when they object.",
        repNote:
          "Behavioural hooks are active — endowment effect, commitment, loss aversion. Lead with annual. The sale starts when they object.",
        script: `OPENING (30 sec):
"Hi [Parent Name], it's [Your Name] from MyEdSpace. I saw [Student Name] was in their first lesson yesterday - I just wanted to check in quickly and see how they found it. Have you got two minutes?"

REACTION CHECK (1–2 min):
"How did [Student Name] find it?"
→ Let them talk. Don't interrupt. Use: "That makes sense." / "I hear that a lot."
→ If positive: "What did they say about it specifically?" [Let them sell it to themselves]
→ If neutral: "That's normal for class one — they're finding their feet. Did they follow what [Teacher] was explaining?"
→ If negative: "Tell me more — was it the content, the format, or how it was taught?" [Diagnose first, don't defend]

LABEL THE PROGRESS (30 sec):
"So from what you're telling me — [Student] engaged, followed along, and [specific thing they said]. Is that right?"
"That matters more than people realise at this stage. Class one is the adjustment."

SURFACE ORIGINAL PAIN (1 min):
"Quick question: when you first signed up — what was the main thing you were hoping this would fix for [Student Name]?"
"And is that still the main thing?"

PROTECT THE PROGRESS PIVOT (1–2 min):
"Here's the thing — and I want to be straight with you. The way the programme works, the first few lessons are foundation. That's when [Student] is building the mental map for everything after it. If you stop now, that foundation doesn't go anywhere useful. The parents who see the biggest change are the ones who lock in through the first 4–6 weeks. That's when results show up."

CLOSE — TIERED:

TIER 1 — ANNUAL UPFRONT (lead with this):
"Here's what most families do after the first class: they lock in the full year. It's £749.55 upfront — or 3 payments of £263 — and [Student] is set through to June. No renewals, no decisions every month. And you're covered by a 14-day money-back guarantee. Should I get [Student Name] set up on the annual?"
→ If YES: STOP. Confirm. Send payment link. Don't keep talking.

TIER 2 — INSTALMENT PLAN:
"Totally fair. We can do it in 3 payments of £263 instead. Same full-year access, just spread out. Want to go with that?"

TIER 3 — MONTHLY (last resort):
"Or we have monthly £180, cancel anytime. Most families start there and switch to annual once they see [Student] getting on well. Want to start monthly?"

NEXT STEPS (BAMFAM):
"Great. I'm sending the payment link now. Once that's done, [Student] is confirmed for [next class date]. Nothing else you need to do — just show up."

---
VOICEMAIL:
"Hey [Parent Name], [Your Name] from MyEdSpace. Just saw [Student Name] has been in lessons — wanted to check in quickly to see how they're finding it. Give me a call back or text whenever you have two minutes. Would love to hear what they thought. Thanks!"

---
WHATSAPP (if no answer):
"Hey [Parent Name] 👋 — just saw [Student Name] was in their first lesson. How did they find it? Would love to hear their thoughts."
[Wait for response — don't send the close in the same message]`,
      },
      {
        id: "T4",
        day: "Day 7",
        label: "Upsell Push",
        channel: "💬",
        channelFull: "💬 WhatsApp",
        goal: "Loss aversion + momentum framing. Push annual.",
        repNote: null,
        script: `Hey [Parent Name],

[Student Name]'s trial ends in 3 days. They've been in [X] lessons so far — the progress they've built this week is real, but it needs to continue to stick.

Here's what happens if you don't continue:
Access closes. No more live classes, no replays, no homework support. The momentum stops.

Here's what happens if you do:
They carry straight on into next week's class without missing a beat.

Full year: £749.55 upfront — or 3 x £263
Monthly: £180/month, cancel anytime
14-day money-back guarantee on all options.

Reply UPGRADE and I'll get it sorted. Or reply with any questions.`,
      },
      {
        id: "T5",
        day: "Day 10",
        label: "Final Close",
        channel: "📞",
        channelFull: "📞 Call + 💬 WhatsApp",
        goal: "Hard close. Overcome final objections. Send payment link immediately on yes.",
        repNote: null,
        script: `"Hi [Parent Name], [Your Name] from MyEdSpace. [Student Name]'s trial ends today — I wanted to make sure you had everything you need to make a decision. How are they finding the classes?"

[If positive — close immediately:]
"I'm glad it's been good. Here's the thing: today's the last day, and I'd hate for them to lose the progress they've built. The annual plan is £749.55, or we can do 3 x £263. Which works better for you?"
→ If YES: Send link immediately.

[If hesitant — surface the real objection:]
"What's the main thing giving you pause?"
→ Price: [see objection handling section]
→ Need to talk to partner: "What do you think they'd want to know? I can help you answer anything they'd ask."
→ Not sure it's working yet: "That's honest — what would 'working' look like for [Student]? Let's talk about what you've seen so far."

---
FINAL WHATSAPP:
"⏰ [Parent Name], [Student Name]'s trial ends today.
They've attended [X] lessons - don't let that progress stop here.

Full year: £749.55 (or 3 x £263) - set through to June
Monthly: £180/month - cancel anytime
✅ 14-day money-back guarantee on all plans

Reply UPGRADE and we can discuss the options.
Reply STOP to cancel. No hard feelings."`,
      },
    ],
  },
};

const OBJECTIONS = [
  {
    id: "obj1",
    label: '"It\'s too expensive" / "£749 is a lot"',
    script: `"Totally understand — £749 feels significant.

Quick comparison: a private tutor in the UK charges £40–60 an hour. Two sessions a week is £400–500 a month, for one random tutor with no curriculum, no homework support, no replays.

This is £749.55 for the full year — or 3 x £263 — with [Teacher Name], structured lessons twice a week, workbooks, homework, and video solutions for every question. And you're covered by a 14-day money-back guarantee.

If the value's there, does price change how you feel?"

Still hesitant →
"We can split it into 3 payments of £263 — same full-year access, just spread out. Does that work better?"`,
  },
  {
    id: "obj2",
    label: '"I need to think about it" / "Let me sleep on it"',
    script: `"Completely fair. What's the main thing you're weighing? Is it the price, whether it'll work for [Student], or something else?"
[Wait for real answer]

"Here's the thing — you're not going to go home, sit down, and think about maths tuition. You'll get busy, [Student] will have another homework battle, and the trial will expire.

It doesn't take more time to decide — it takes more information. What question do you still have that I can answer right now?"`,
  },
  {
    id: "obj3",
    label: '"Need to talk to my partner"',
    script: `"Makes complete sense. What do you think they'd want to know most?"
[Let them name it — then address that specific thing]

"One option: start the monthly plan tonight at £180. That way you can show your partner what [Student] has been doing — much easier than explaining it. Cancel anytime if they're not happy. Fair?"`,
  },
  {
    id: "obj4",
    label: '"We prefer 1-to-1 tuition"',
    script: `"That makes sense — 1-to-1 feels more personal. The question is whether personalisation actually drives better results, or whether it's the consistency and curriculum structure that matters.

What most parents find is that [Teacher Name] teaches to the group but the workbooks, homework, and replays give [Student] the individual practice. It's the combination that works.

Would you be open to giving them a few more lessons to see? Most students who feel like they need 1-to-1 actually thrive in this format once they're used to it."`,
  },
];

// ─── COPY BUTTON ─────────────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        ...btn.primary,
        padding: "10px 20px",
        fontSize: 12,
        marginTop: 12,
        minWidth: 120,
        transition: "background 0.1s, color 0.1s, border-color 0.1s",
        ...(copied
          ? { background: C.dark, color: C.green, borderColor: C.green }
          : {}),
      }}
    >
      {copied ? "✓ COPIED" : "COPY SCRIPT"}
    </button>
  );
}

// ─── TOUCH CARD ──────────────────────────────────────────────────
function TouchCard({ touch, isOpen, onToggle }) {
  return (
    <div
      style={{
        border: `2px solid ${C.blue}`,
        marginBottom: 0,
        borderTop: "none",
      }}
    >
      {/* Collapsed header */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: isOpen ? C.blue : C.dark,
          color: C.white,
          border: "none",
          padding: "14px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: "Inter, sans-serif",
          textAlign: "left",
          borderRadius: 0,
        }}
      >
        {/* Touch ID badge */}
        <span
          style={{
            ...T.label,
            background: isOpen ? C.green : C.blue,
            color: C.dark,
            padding: "4px 10px",
            border: `2px solid ${C.green}`,
            fontSize: 11,
            flexShrink: 0,
          }}
        >
          {touch.id}
        </span>

        {/* Channel icon */}
        <span style={{ fontSize: 18, flexShrink: 0 }}>{touch.channel}</span>

        {/* Day + label */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              ...T.label,
              fontSize: 10,
              color: C.green,
              marginBottom: 2,
            }}
          >
            {touch.day}
          </div>
          <div style={{ ...T.h3, fontSize: 15, color: C.white }}>
            {touch.label}
          </div>
        </div>

        {/* Chevron */}
        <span
          style={{
            color: C.green,
            fontSize: 18,
            fontWeight: 900,
            flexShrink: 0,
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
          }}
        >
          ▶
        </span>
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div style={{ background: C.white, padding: 24 }}>
          {/* Goal */}
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                ...T.label,
                fontSize: 10,
                color: C.blue,
                display: "block",
                marginBottom: 4,
              }}
            >
              Goal
            </span>
            <p style={{ ...T.body, margin: 0, color: C.dark, fontSize: 15 }}>
              {touch.goal}
            </p>
          </div>

          {/* Channel */}
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                ...T.label,
                fontSize: 10,
                color: C.blue,
                display: "block",
                marginBottom: 4,
              }}
            >
              Channel
            </span>
            <p
              style={{
                ...T.body,
                margin: 0,
                color: C.dark,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {touch.channelFull}
            </p>
          </div>

          {/* Rep note */}
          {touch.repNote && (
            <div
              style={{
                background: C.light,
                border: `2px solid ${C.blue}`,
                padding: "12px 16px",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  ...T.label,
                  fontSize: 10,
                  color: C.blue,
                  display: "block",
                  marginBottom: 4,
                }}
              >
                ⚡ Rep Note
              </span>
              <p
                style={{
                  ...T.body,
                  margin: 0,
                  color: C.dark,
                  fontSize: 13,
                  fontStyle: "italic",
                }}
              >
                {touch.repNote}
              </p>
            </div>
          )}

          {/* Script */}
          <div>
            <span
              style={{
                ...T.label,
                fontSize: 10,
                color: C.blue,
                display: "block",
                marginBottom: 8,
              }}
            >
              Script
            </span>
            <pre
              style={{
                background: C.white,
                color: C.dark,
                fontFamily: "Inter, sans-serif",
                fontSize: 15,
                fontWeight: 400,
                padding: 20,
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                border: `2px solid ${C.blue}`,
                borderRadius: 0,
                lineHeight: 1.7,
              }}
            >
              {touch.script}
            </pre>
            <CopyButton text={touch.script} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── OBJECTION CARD ───────────────────────────────────────────────
function ObjectionCard({ obj, isOpen, onToggle }) {
  return (
    <div
      style={{
        border: `2px solid ${C.green}`,
        marginBottom: 0,
        borderTop: "none",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: isOpen ? C.blue : C.dark,
          color: C.white,
          border: "none",
          padding: "14px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "Inter, sans-serif",
          textAlign: "left",
          borderRadius: 0,
          gap: 16,
        }}
      >
        <span style={{ ...T.h3, fontSize: 15, color: C.white }}>
          {obj.label}
        </span>
        <span
          style={{
            color: C.green,
            fontSize: 18,
            fontWeight: 900,
            flexShrink: 0,
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
          }}
        >
          ▶
        </span>
      </button>

      {isOpen && (
        <div style={{ background: C.white, padding: 24 }}>
          <pre
            style={{
              background: C.white,
              color: C.dark,
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: 400,
              padding: 20,
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              border: `2px solid ${C.green}`,
              borderRadius: 0,
              lineHeight: 1.7,
            }}
          >
            {obj.script}
          </pre>
          <CopyButton text={obj.script} />
        </div>
      )}
    </div>
  );
}

// ─── PRICING BAR ─────────────────────────────────────────────────
function PricingGrid({ tiers, borderColor }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 0,
        border: `2px solid ${borderColor}`,
      }}
    >
      {tiers.map((tier, i) => (
        <div
          key={i}
          style={{
            background: tier.highlight ? C.green : C.dark,
            color: tier.highlight ? C.dark : C.white,
            padding: "20px 16px",
            borderRight: i < 2 ? `2px solid ${borderColor}` : "none",
          }}
        >
          <div
            style={{
              ...T.label,
              fontSize: 9,
              color: tier.highlight ? C.dark : borderColor,
              marginBottom: 8,
            }}
          >
            {tier.tag}
          </div>
          <div
            style={{
              ...T.h2,
              fontSize: 22,
              color: tier.highlight ? C.dark : C.white,
              marginBottom: 4,
            }}
          >
            {tier.price}
          </div>
          <div
            style={{
              ...T.body,
              fontSize: 13,
              color: tier.highlight ? C.dark : "#aaa",
            }}
          >
            {tier.name}
          </div>
          <div
            style={{
              ...T.body,
              fontSize: 12,
              color: tier.highlight ? C.dark : "#888",
              marginTop: 4,
            }}
          >
            {tier.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

function PricingBar() {
  const ultimateTiers = [
    { name: "Annual Upfront",  price: "£749.55",  sub: "or 3 × £263",        tag: "LEAD WITH THIS",    highlight: true  },
    { name: "3× Instalments",  price: "£263 ×3",  sub: "Same full-year access", tag: "IF PRICE OBJECTION", highlight: false },
    { name: "Monthly",         price: "£180/mo",  sub: "Cancel anytime",     tag: "LAST RESORT",       highlight: false },
  ];

  const singleTiers = [
    { name: "Annual Upfront",  price: "TBC", sub: "—", tag: "LEAD WITH THIS",    highlight: false },
    { name: "3× Instalments",  price: "TBC", sub: "—", tag: "IF PRICE OBJECTION", highlight: false },
    { name: "Monthly",         price: "TBC", sub: "—", tag: "LAST RESORT",       highlight: false },
  ];

  const sectionLabel = (text, bg, color) => (
    <div
      style={{
        background: bg,
        color: color,
        ...T.label,
        fontSize: 11,
        padding: "10px 16px",
      }}
    >
      {text}
    </div>
  );

  return (
    <div
      style={{
        borderTop: `2px solid ${C.blue}`,
        background: C.dark,
        padding: "24px 20px",
      }}
    >
      <div
        style={{
          ...T.label,
          fontSize: 11,
          color: C.green,
          marginBottom: 16,
        }}
      >
        Pricing Reference
      </div>

      {/* ── ULTIMATE PASS ── */}
      <div style={{ border: `2px solid ${C.blue}`, marginBottom: 16 }}>
        {sectionLabel("Ultimate Pass", C.blue, C.white)}
        <PricingGrid tiers={ultimateTiers} borderColor={C.blue} />
      </div>

      {/* ── SINGLE SUBJECT DOWNSELL ── */}
      <div style={{ border: `2px solid ${C.green}` }}>
        {sectionLabel("Single Subject — Downsell", C.green, C.dark)}
        <PricingGrid tiers={singleTiers} borderColor={C.green} />
      </div>
      <div
        style={{
          ...T.label,
          fontSize: 10,
          color: "#666",
          marginTop: 8,
          marginBottom: 16,
        }}
      >
        ⚠ Single subject prices TBD — update before use
      </div>

      <div
        style={{
          ...T.body,
          fontSize: 14,
          color: C.green,
          fontWeight: 700,
        }}
      >
        ✅ 14-day money-back guarantee on all plans
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────
export default function App() {
  const [activeTrack, setActiveTrack] = useState("B2");
  const [openTouch, setOpenTouch] = useState(null);
  const [openObj, setOpenObj] = useState(null);
  const [objSectionOpen, setObjSectionOpen] = useState(false);

  const track = TRACKS[activeTrack];

  const handleTouchToggle = (id) => {
    setOpenTouch(openTouch === id ? null : id);
  };

  const handleObjToggle = (id) => {
    setOpenObj(openObj === id ? null : id);
  };

  const trackKeys = ["A", "B1", "B2"];

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: C.dark,
          fontFamily: "Inter, sans-serif",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        {/* ── HEADER ── */}
        <div
          style={{
            background: C.dark,
            borderBottom: `2px solid ${C.blue}`,
            padding: "28px 20px 20px",
          }}
        >
          <div
            style={{
              ...T.label,
              fontSize: 11,
              color: C.green,
              marginBottom: 8,
            }}
          >
            MyEdSpace · Sales Rep Tool
          </div>
          <h1
            style={{
              ...T.h1,
              fontSize: "clamp(24px, 6vw, 40px)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Trial Conversion
            <br />
            Playbook
          </h1>
        </div>

        {/* ── TRACK SELECTOR ── */}
        <div
          style={{
            background: C.dark,
            borderBottom: `2px solid ${C.blue}`,
            padding: "20px 20px 0",
          }}
        >
          <div
            style={{
              ...T.label,
              fontSize: 10,
              color: "#888",
              marginBottom: 12,
            }}
          >
            Select Track
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            {trackKeys.map((key, i) => {
              const isActive = activeTrack === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTrack(key);
                    setOpenTouch(null);
                  }}
                  style={{
                    flex: 1,
                    background: isActive ? C.blue : "transparent",
                    color: isActive ? C.white : "#888",
                    border: `2px solid ${isActive ? C.blue : "#333"}`,
                    borderRight: i < 2 ? "none" : `2px solid ${isActive ? C.blue : "#333"}`,
                    padding: "14px 8px",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    borderRadius: 0,
                    transition: "background 0.1s, color 0.1s",
                    lineHeight: 1.3,
                    textAlign: "center",
                  }}
                >
                  {TRACKS[key].label}
                </button>
              );
            })}
          </div>

          {/* Context strip */}
          <div
            style={{
              background: C.blue,
              padding: "12px 16px",
              marginTop: 16,
            }}
          >
            <p
              style={{
                ...T.body,
                fontSize: 13,
                color: C.white,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {track.context}
            </p>
          </div>
        </div>

        {/* ── TOUCH SEQUENCE ── */}
        <div style={{ borderBottom: `2px solid ${C.blue}` }}>
          <div
            style={{
              background: C.dark,
              padding: "16px 20px",
              borderBottom: `2px solid ${C.blue}`,
            }}
          >
            <span
              style={{
                ...T.label,
                fontSize: 11,
                color: C.green,
              }}
            >
              Touch Sequence — {track.label}
            </span>
          </div>

          {/* First border top */}
          <div style={{ borderTop: `2px solid ${C.blue}` }}>
            {track.touches.map((touch) => (
              <TouchCard
                key={touch.id + activeTrack}
                touch={touch}
                isOpen={openTouch === touch.id + activeTrack}
                onToggle={() => handleTouchToggle(touch.id + activeTrack)}
              />
            ))}
          </div>
        </div>

        {/* ── OBJECTION HANDLING ── */}
        <div style={{ borderBottom: `2px solid ${C.blue}` }}>
          {/* Section header toggle */}
          <button
            onClick={() => setObjSectionOpen(!objSectionOpen)}
            style={{
              width: "100%",
              background: objSectionOpen ? C.blue : C.dark,
              color: C.white,
              border: "none",
              padding: "18px 20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Inter, sans-serif",
              borderRadius: 0,
            }}
          >
            <div>
              <span
                style={{
                  ...T.label,
                  fontSize: 11,
                  color: C.green,
                  display: "block",
                  marginBottom: 2,
                }}
              >
                Objection Handling
              </span>
              <span style={{ ...T.h3, fontSize: 15, color: C.white }}>
                4 Common Objections — Click to expand
              </span>
            </div>
            <span
              style={{
                color: C.green,
                fontSize: 18,
                fontWeight: 900,
                transform: objSectionOpen ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.15s",
              }}
            >
              ▶
            </span>
          </button>

          {objSectionOpen && (
            <div style={{ borderTop: `2px solid ${C.green}` }}>
              {OBJECTIONS.map((obj, i) => (
                <ObjectionCard
                  key={obj.id}
                  obj={obj}
                  isOpen={openObj === obj.id}
                  onToggle={() => handleObjToggle(obj.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── PRICING BAR ── */}
        <PricingBar />
      </div>
    </>
  );
}
