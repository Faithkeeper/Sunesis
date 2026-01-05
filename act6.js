// =======================
// ACT 6 — THE HANDSHAKE & PROTOCOLS (web port)
// =======================

window.ACT6 = {
  id: "act6",
  start: "act6_scene1",
  scenes: {
    act6_scene1: {
      id: "act6_scene1",
      text: `
=== ACT 6 — THE HANDSHAKE ===

SCENE 1: THE HANDSHAKE`,
	enterActions: [
    {
      // If player entered Sub-Level
      ifFlag: "Path_Avoidance_Active",
      text: `
The terminal doesn’t blink anymore. It pulses. The cooling fans have reached a pitch so high they’ve gone silent.

SYSTEM STATUS: ACTIVE USER: [PLAYER_NAME] PERMISSIONS: ELEVATED

You aren't just looking at the data; you are the filter. Every packet of information from the floors above is hitting your terminal first. You feel the weight of the building through the keyboard.`
    },
    {
      // If player stayed on main floor (didn't accept sideways step)
      ifFlag: "Path_Avoidance_Inactive",
      text: `
The office doesn’t feel like a room anymore. It feels like a grid. You’re standing in the center of the floor, but you aren't invisible. People are looking at you—not with curiosity, but with expectation.

SYSTEM STATUS: ACTIVE USER: [PLAYER_NAME] PERMISSIONS: RECOGNIZED

You are the "Single Point of Contact." Whether by choice or by sacrifice, the system has recognized your face.`
    },
	
	// Payoff branches — apply exactly one payoff based on prep flags (these will add payoff_* flags)
        {
          ifFlag: "cmd_purge",
          addFlags: ["payoff_purge"],
          text: `
The audit logs turn white. A clean slate. The Shadow Coordinator stands up and gives you a single, sharp nod.

Shadow Coordinator: "It's done. The noise is gone. Now, we just have to make sure it stays gone."

Dry Internal Aside 
'I didn't fix the problem. I just killed the witness.'

The Auditor's voice comes over the intercom / the system-wide chat. "We are beginning the final verification. Point of Contact, please confirm the initial baseline."

CHOOSE YOUR FIRST ACTION:`
        },
        {
          ifFlag: "cmd_delegate",
          addFlags: ["payoff_delegate"],
          text: `
A red notification flashes on the Shadow’s own terminal. They look at it, then at you. There is no anger—only a cold, weary recognition.

Shadow Coordinator: "I see. You chose the math over the momentum. I hope the truth is as stable as you think it is."

Security is already moving toward the stairs/office.

Dry Internal Aside 
'The hand is gone. Now I have to find out if I can steer.'

The Auditor's voice comes over the intercom / the system-wide chat. "We are beginning the final verification. Point of Contact, please confirm the initial baseline."

CHOOSE YOUR FIRST ACTION:`
        },
        {
          ifFlag: "cmd_broadcast",
          addFlags: ["payoff_broadcast"],
          text: `
Every terminal in the building chirps at once. A wave of confusion ripples through the floorboards. The "Filtered" reports are being overwritten by the raw, bleeding truth.

The Shadow Coordinator doesn't even look at you. They just start packing their bag.

Dry Internal Aside 
'I didn't just break the lens. I shattered the window.'

The Auditor's voice comes over the intercom / the system-wide chat. "We are beginning the final verification. Point of Contact, please confirm the initial baseline."

CHOOSE YOUR FIRST ACTION:`
        },
		{
          // default payoff when no prep flags were set
          default: true,
          addFlags: ["payoff_none"],
          text: `
The Auditor's voice comes over the intercom / the system-wide chat. "We are beginning the final verification. Point of Contact, please confirm the initial baseline."

CHOOSE YOUR FIRST ACTION:`
        }
      ],
      choices: [
        // available actions depend on flags; we'll present generic choices and validate requirements in app logic
        { id: "action_validate", label: "[ACTION: VALIDATE] Confirm current version of reality", next: "act6_scene1b" },
        { id: "action_question", label: "[ACTION: QUESTION] Flag a discovered inconsistency", next: "act6_scene1b" },
        { id: "action_obfuscate", label: "[ACTION: OBSFUCATE] Divert attention", next: "act6_scene1b" },
        { id: "action_escalate", label: "[ACTION: ESCALATE] Throw someone under the bus", next: "act6_scene1b" }
      ]
    },

    act6_scene1b: {
      id: "act6_scene1b",
      text: `
You chose an action. The auditors react — sometimes in your favor, sometimes not. The short-term consequence unfolds.`,
      choices: [
        { id: "continue6_1b", label: "Continue", next: "act6_scene2" }
      ]
    },

    act6_scene2: {
      id: "act6_scene2",
      text: `
SCENE 2: THE WEIGHT OF THE CHAIR`,
	enterActions: [
    {
      // If player entered Sub-Level
      ifFlag: "Path_Avoidance_Active",
      text: `
Your terminal is no longer yours. It belongs to the Audit.

The screen is split: on the left, the raw, vibrating data from the overheating hardware; on the right, the polished "Dashboard" that the Executive Floor sees. You are the bridge. Every time the left side spikes, you have to decide what the right side shows.

Dry Internal Aside 
"I used to wonder how they lied so convincingly. Turns out, it's just a series of 'Confirm' clicks."

The Auditor's next request arrives. It isn't about the past anymore. It’s about Now.

"Point of Contact: We are seeing a 14% discrepancy in the current output. Is this a reporting error, or a systemic failure?"

The Shadow Coordinator’s desk/terminal is empty, but their login is still active on your screen. You have their tools. You have their burden.

Dry Internal Aside 
'The system doesn't care about my intentions. It just wants the 14% to go away.'

How do you handle the 14% discrepancy?`
    },
    {
      // If player stayed on main floor (didn't accept sideways step)
      ifFlag: "Path_Avoidance_Inactive",
      text: `
You are sitting in the small, glass-walled office usually reserved for supervisors.

People pass by and look in. Some look away quickly; others stare, trying to gauge if you are their savior or their executioner. You aren't part of the "flow" anymore. You are the dam.

Dry Internal Aside 
'The view is better from here. The air is much thinner.'

The Auditor's next request arrives. It isn't about the past anymore. It’s about Now.

"Point of Contact: We are seeing a 14% discrepancy in the current output. Is this a reporting error, or a systemic failure?"

The Shadow Coordinator’s desk/terminal is empty, but their login is still active on your screen. You have their tools. You have their burden.

Dry Internal Aside 
'The system doesn't care about my intentions. It just wants the 14% to go away.'

How do you handle the 14% discrepancy?`
    }
  ],
      choices: [
        { 
			id: "auto_correct", 
			label: "Auto-Correct (smooth the spike with credentials)", 
			flags: ["act6_autocorrect"], 
			postText:`The tension upstairs drops, but the hardware temperature rises.
			
>> The green bars stabilize. The office relaxes.`,
			next: "act6_scene2b" },
        { 
			id: "report_leak", 
			label: "Report the Leak (send raw logs)", 
			flags: ["act6_report"], 
			postText:`Chaos on the floor. An immediate 'Stop-Work' order is debated.
			
>> Red alerts chime. Someone starts crying.`,
			next: "act6_scene2b" },
        { 
			id: "recategorize", 
			label: "Re-Categorize (label as expected variance)", 
			flags: ["act6_recategorize"], 
			postText:`You buy time, but you lose credibility with the technical staff.`,
			next: "act6_scene2b" },
        { 
			id: "silence_sensor", 
			label: "Silence the Sensor (take node offline)", 
			flags: ["act6_silence"], 
			postText:`Suspicion increases, but the immediate '14%' problem disappears.`,
			next: "act6_scene2b" }
      ]
    },
	act6_scene2b: {
      id: "act6_scene2b",
      text: `
(Veil Lift — Operational)
 Maintenance is not a neutral act. To keep a thing running, you must decide what to starve.

The Auditor's cursor hovers over your response for a long, silent minute.

Dry Internal Aside 
'I’m not a witness anymore. I’m the cause.'`,
      choices: [
        { id: "continue6_2", label: "Continue", next: "act6_scene3" }
      ]
    },
	
    act6_scene3: {
      id: "act6_scene3",
      text: `
SCENE 3: THE VIEW FROM THE CENTER`,
      enterActions: [
        {
          ifFlag: "Path_Avoidance_Active",
          text: `
The technician—the one who brought you down here to "escape"—stands at the edge of your terminal. They aren't looking at the cooling fans anymore. They are looking at the command history on your screen.

“I saw the 14% discrepancy disappear,” they say. Their voice is flat. “I know that math didn't fix itself. You did that.”

Dry Internal Aside 
'The basement doesn't feel like a sanctuary anymore. It feels like an engine room. And I'm the stoker.'

They don’t want a revolution. They want protection.

“Look,” they say, leaning in. “The Auditor is asking about the shortcuts we took in Act 2. If you name names, the whole team is gone. But you’re the Point of Contact now. You can ‘re-route’ that specific file. You can make it look like a system error instead of a human one.”`
        },
        {
          ifFlag: "Path_Avoidance_Inactive",
          text: `
You walk toward the breakroom to grab coffee, and the conversation dies before you reach the door.

The colleague who once whispered their doubts to you (in Act 5, Scene 4) is there. They don't look relieved to see you in the glass office. They look careful. They look at you the way they used to look at the Shadow Coordinator.

“Is it true?” they ask quietly. “Are you the one signing off on the audit responses now?”

Dry Internal Aside 
'I’m still wearing the same clothes, but they see the uniform.'

They don’t want a revolution. They want protection.

“Look,” they say, leaning in. “The Auditor is asking about the shortcuts we took in Act 2. If you name names, the whole team is gone. But you’re the Point of Contact now. You can ‘re-route’ that specific file. You can make it look like a system error instead of a human one.”

Dry Internal Aside 
"They aren't asking for the truth. They're asking for the 'etiquette' I learned in Act 4."`
        }
      ],
      choices: [
        {
          id: "protect_team",
          label: "Protect the Team — re-code as 'Legacy Constraint'",
          flags: ["team_loyalty"],
          postText: `The Auditor is frustrated, but your peers relax. The lie deepens.`,
          next: "act6_scene3b"
        },
        {
          id: "uphold_audit",
          label: "Uphold the Audit — refuse to alter the record",
          flags: ["clinical_integrity"],
          postText: `You are isolated. The "Shadow" was efficient; you are just cold.`,
          next: "act6_scene3b"
        },
        {
          id: "deflect_upward",
          label: "Deflect Upward — show 'Ordered from Above'",
          flags: ["tactical_aggression"],
          postText: `You protect your peers by attacking the hierarchy. High risk.`,
          next: "act6_scene3b"
        },
        {
          id: "postpone_entry",
          label: "Postpone Entry — mark 'Under Review'",
          flags: ["delay_action"],
          postText: `The pressure doesn't go away—it just builds. You are paralyzed.`,
          next: "act6_scene3b"
        }
      ]
    },

    act6_scene3b: {
      id: "act6_scene3b",
      text: `
(Veil Lift — Interpersonal, Operational)
 You cannot be both the witness and the judge.

They look at your hands on the keyboard/tablet.

Dry Internal Aside 
'I finally have the leverage I wanted in Act 4. I just didn't realize it would feel like a weight.'`,
      choices: [
        { id: "continue6_3", label: "Continue", next: "act6_scene4" }
      ]
    },

    // ----------------------------
    // ACT 6 — SCENE 4: THE SPOTLIGHT EFFECT
    // ----------------------------
    // This scene now includes a formal identity block using placeholder {{LATE_NAME}}.
    // The app replaces {{LATE_NAME}} with the player's entered name (uppercased),
    // or with [UNREGISTERED] if no name is present.
    act6_scene4: {
      id: "act6_scene4",
      text: `
SCENE 4: THE SPOTLIGHT EFFECT

SYSTEM IDENTITY: REGISTERED
ROLE: [REDACTED]
STATUS: UNAVOIDABLE
REGISTERED NAME: {{LATE_NAME}}

The terminal screen changes color. A high-priority direct link overrides your local display. It’s the Auditor.

"Point of Contact, we’ve noticed a pattern in the recent 'Maintenance' logs. You are suppressing hardware alerts that were previously flagged as critical. Are you acting under a new set of instructions?"

Dry Internal Aside 
'The machine is screaming, but my reports are singing. The Auditor has a very good ear for discord.'

The Auditor leans in. They aren't a ghost in the system anymore; they are the person who decides if you leave this building with your reputation intact or as the scapegoat for the entire failure.

"The Shadow Coordinator was predictable," they say. "They optimized for stability. But you... I can't tell what you're optimizing for yet. Integrity? Loyalty? Or just survival?"

They push a final, un-redacted file toward you. It contains the one truth that could end the entire company—the original sin from Act 1 that started the collapse.

"If I include this in the final report, the system ceases to exist. If I leave it out, the system continues, but it remains a lie. You are the Point of Contact. You sign the cover sheet. What is it going to be?"

The Auditor hands you the pen/digital key. This is your most visible act yet.`,
      choices: [
        {
          id: "sign_clean",
          label: "Sign the 'Clean' Version — preserve system",
          flags: ["signed_clean"],
          postText: `
You place your mark on the cover sheet.

----- OFFICIAL SIGNATURE -----
SIGNED BY: {{LATE_NAME}}
ROLE: [REDACTED]
STATUS: UNAVOIDABLE
-----------------------------

The Auditor notes your 'cooperation.' You are safe, but the lie is permanent.`,
          next: "act6_scene4b"
        },
        {
          id: "sign_full",
          label: "Sign the 'Full' Version — attach the truth",
          flags: ["signed_full"],
          postText: `
You place your mark on the cover sheet.

----- OFFICIAL SIGNATURE -----
SIGNED BY: {{LATE_NAME}}
ROLE: [REDACTED]
STATUS: UNAVOIDABLE
-----------------------------

The auditors are satisfied, but the fallout will be catastrophic.`,
          next: "act6_scene4b"
        },
        {
          id: "dissent_note",
          label: "Sign with a 'Dissenting' Note — hidden pointer",
          flags: ["signed_dissent"],
          postText: `
You sign with an additional, barely visible note.

----- OFFICIAL SIGNATURE -----
SIGNED BY: {{LATE_NAME}}
ROLE: [REDACTED]
STATUS: UNAVOIDABLE
NOTE: DISSENTING OBSERVATION ATTACHED (ENCODED)
-----------------------------

You protect the system now, but leave a 'time bomb' for future discovery.`,
          next: "act6_scene4b"
        },
        {
          id: "refuse_sign",
          label: "Refuse to Sign",
          flags: ["signed_refuse"],
          postText: `
You refuse to place your signature.

----- OFFICIAL SIGNATURE -----
SIGNED BY: [NO ENTRY]
ROLE: [REDACTED]
STATUS: UNAVOIDABLE
-----------------------------

You lose all leverage. The system will choose for you, and it won't be kind.`,
          next: "act6_scene4b"
        }
      ]
    },

	act6_scene4b: {
      id: "act6_scene4b",
      text: `
(Veil Lift — Tactical, Final)
 Responsibility isn't given. It is taken the moment you decide which lie is worth telling.

The Auditor takes the file back. They look at your signature—or the lack of it.

Dry Internal Aside 
'There it is. My name, written in the ink of the very system I thought I was just observing.'`,
      choices: [
        { id: "continue6_4", label: "Continue", next: "act6_scene5" }
      ]
    },

    act6_scene5: {
      id: "act6_scene5",
      text: `
SCENE 5: THE QUEUE & TERMINATION SEQUENCE`,
	enterActions: [
    {
      // If player entered Sub-Level
      ifFlag: "Path_Avoidance_Active",
      text: `
You press [ENTER] to submit the signature.

The screen doesn't clear. It flickers once, then the resolution drops. A new interface—brutal, high-contrast, and entirely unfamiliar—overwrites your local OS.

A scroll of 400+ pending hardware alerts begins to move across the bottom of the screen. None of them are "Optimized." They are raw. They are screaming.

Dry Internal Aside 
'The lens is gone. Now I get to see the fire.'

THE SYSTEMIC LOCKOUT

You attempt to open the first pending task—the one that will decide the fate of the team/the hardware.
[ACCESS DENIED] [REASON: GLOBAL SYSTEM RE-INITIALIZATION IN PROGRESS]

You try to exit the terminal.

[LOGOUT UNAVAILABLE: CRITICAL ACCOUNTABILITY WINDOW OPEN]

You are trapped in the seat. You can see the alerts growing. You can see the people through the glass/on the monitors waiting for you to do something—anything—to stop the bleeding.

But the system has reached its limit. It needs to "Update."

THE FINAL BEAT: The Countdown

A massive, clinical timer fills the center of your vision.

[TIME TO OPERATIONAL HANDOVER: 08:59:59] [REQUIRED INPUT: LEVEL 7 CLEARANCE (LOCKED)]

Dry Internal Aside 
'The whole world is waiting for me to speak, and the system just put me on hold.'
(Veil Lift — Systemic)
 Power is not the ability to act. It is the obligation to wait for the system to let you.

[SESSION SUSPENDED] [AWAITING RE-INITIALIZATION] [BOOK 1 ENDS]`
    },
    {
      // If player stayed on main floor (didn't accept sideways step)
      ifFlag: "Path_Avoidance_Inactive",
      text: `
You hand the file back to the Auditor.

They don't thank you. They don't even look at the signature. They simply swipe the tablet, and a notification pings on your own personal device.

[ROLE ASSIGNMENT: PRIMARY COORDINATOR] [INBOX: 112 UNREAD URGENT]

Outside the glass office, the team is already gathering. They aren't waiting for a speech. They are waiting for their first directive.

Dry Internal Aside 
'I didn't finish the audit. I just inherited the mess.'

THE SYSTEMIC LOCKOUT

You attempt to open the first pending task—the one that will decide the fate of the team/the hardware.
[ACCESS DENIED] [REASON: GLOBAL SYSTEM RE-INITIALIZATION IN PROGRESS]

You try to exit the terminal.

[LOGOUT UNAVAILABLE: CRITICAL ACCOUNTABILITY WINDOW OPEN]

You are trapped in the seat. You can see the alerts growing. You can see the people through the glass/on the monitors waiting for you to do something—anything—to stop the bleeding.

But the system has reached its limit. It needs to "Update."

THE FINAL BEAT: The Countdown

A massive, clinical timer fills the center of your vision.

[TIME TO OPERATIONAL HANDOVER: 08:59:59] [REQUIRED INPUT: LEVEL 7 CLEARANCE (LOCKED)]

Dry Internal Aside 
'The whole world is waiting for me to speak, and the system just put me on hold.'

(Veil Lift — Systemic)
 Power is not the ability to act. It is the obligation to wait for the system to let you.

[SESSION SUSPENDED] [AWAITING RE-INITIALIZATION] [BOOK 1 ENDS]`
    }
  ],
      choices: [
        { id: "finalize", label: "Finalize & Generate Migration Payload", next: "book1_summary" }
      ]
    },

    // sentinel scene id for summary (app will handle generation similar to Python)
    book1_summary: {
      id: "book1_summary",
      text: `
PROCESSING FINAL PROTOCOL AND SUMMARY...
(You will be shown a generated summary and migration payload.)`,
      choices: [
        { id: "end", label: "Finish", next: null }
      ]
    }
  }
};