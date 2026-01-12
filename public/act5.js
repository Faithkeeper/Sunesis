// =======================
// ACT 5 — PRESSURE FROM OUTSIDE (web port)
// =======================

window.ACT5 = {
  id: "act5",
  start: "act5_scene1",
  scenes: {
    act5_scene1: {
      id: "act5_scene1",
      text: `
=== ACT 5 — PRESSURE FROM OUTSIDE ===

SCENE 1: Pressure from Outside

The fracture doesn’t announce itself anymore. 

Reality just refuses to cooperate.

Something changes in the environment — not catastrophically, not dramatically. Routine processes are failing. Decisions made weeks ago are rotting in real-time. “This is just temporary,” someone says. But they’re looking at the exit while they say it.

Nothing breaks.

Everything strains.`,
enterActions: [
    {
      // If player entered Sub-Level
      ifFlag: "Path_Avoidance_Active",
      text: `The system notices immediately. Not because it has a mind, but because the throughput drops. The "Request" queue gets longer. The "Status" updates get vaguer. You see the "Risk Tolerance" split in the server logs—one group is overclocking the hardware to maintain speed, the other is pulling the brakes to check for errors.`
    },
    {
      // If player stayed on main floor (didn't accept sideways step)
      ifFlag: "Path_Avoidance_Inactive",
      text: `People notice immediately. Not because they understand why, but because normal stops working. Meetings get longer. Outcomes get vaguer. You see the "Risk Tolerance" split in the way people stand—some leaning into the table, some leaning back.`
    }
  ],
      choices: [
        { 
			id: "ack_pressure", 
			label: "Continue",
			postText:`
“This is just temporary,” someone says. “We’ve handled worse.”

It lands — but weaker this time.

Dry Internal Aside
'That explanation is starting to sweat.'

The second current reacts differently.

Questions sharpen. People trace dependencies. Someone points out that the issue isn’t new — it’s just visible now.

The room doesn’t argue.

It divides along the fault line that already exists.

Only now, the cost of disagreement is measurable.

(Veil Lift — External, Unavoidable)
When pressure comes from outside the system,
 interpretation stops being theoretical.

You watch how people choose.

Not based on truth —
 based on risk tolerance.

Some double down on reassurance. They need momentum. They reframe failure as delay. They protect morale aggressively.

Others slow down hard. They accept inefficiency in exchange for clarity. They want to understand before acting again.

Neither side is stupid.
 Neither side is evil.

They’re optimizing for different losses.

Dry Internal Aside
'Turns out reality doesn’t care which explanation is comforting.'

The external pressure doesn’t wait.

A deadline approaches. A dependency tightens. A consequence becomes unavoidable.

Someone says what everyone is thinking:

“We can’t keep operating like this.”

They don’t look at you.

They don’t look at anyone in particular.

They’re stating a fact.`,
			next: "act5_scene2" }
      ]
    },

    act5_scene2: {
      id: "act5_scene2",
      text: `
SCENE 2: Someone Wants Answers`,
	enterActions: [
    {
      // If player entered Sub-Level
      ifFlag: "Path_Avoidance_Active",
      text: `
The demand doesn’t come through the door. It arrives as a "System-Wide Audit Request."

A high-level credentials flag hits your terminal. An external party has gained read-access—not someone from the floor above, but someone outside the structure entirely. They don’t want your explanations. They want the raw, unedited logs. They want to know why the throughput is failing and whose digital signature is on the "Override" commands.

Dry Internal Aside 
'Ah. Nothing unites people like an audit.'

Your terminal screen becomes a window into a high-level video conference. Attendance is selective. You see the "Upstairs" managers—their faces are tight, their posture performative. They are speaking for the record now.

“This is a temporary instability,” a manager says through the speakers. “We’re already adapting.”

A notification pings on your screen. A "Query" from the auditor. They've found the technical friction you flagged in Scene 6.

The External Party asks (via text/voice): “What changed?”

Silence on the call. Not because they don't know—but because there are multiple answers, and none of them are safe.

(Veil Lift — External, Cutting) 
	Accountability doesn’t ask who is right. It asks who is answerable.

On the video feed, you see them all look at each other. Then, a few eyes shift toward the camera—toward the "Technical Support" indicator. Toward you.

The External Party speaks: > “Who is coordinating this?”

No one answers. And in that pause, you see the truth: The system has influence. It has momentum. But it has no recognized center.

Dry Internal Aside 
'That’s going to be a problem. They’re looking for a neck to put a leash on.'

The External Party closes their file. “Until that changes,” they say, “we’ll need a single point of contact.”

Dry Internal Aside 
'They didn't assign a leader. They requested a target. And that’s worse.'`
    },
    {
      // If player stayed on main floor (didn't accept sideways step)
      ifFlag: "Path_Avoidance_Inactive",
      text: `
The demand doesn’t come loudly.

It arrives formally.

An external party steps in — not hostile, not confused — just precise. They don’t care about internal explanations, only outcomes. They don’t want philosophy. They want to know why normal operations are failing and who is responsible for correcting it.

They schedule a meeting.

Attendance is… selective.


Dry Internal Aside
'Ah. Nothing unites people like an audit.'

The room feels different this time.

Less conversational.
 More performative.

People speak carefully now — not to understand, but to be on record. Explanations are offered with confidence sharpened by necessity.

“This is a temporary instability,” someone says. “We’re already adapting.”

Another voice counters — measured, restrained.

“We’ve been adapting around unresolved issues. That’s part of the delay.”

The external party listens without reacting.

That’s worse.

They ask a simple question:

“What changed?”

Silence.

Not because no one knows —
 but because there are multiple answers, and none of them are safe.

(Veil Lift — External, Cutting)
Accountability doesn’t ask who is right.
 It asks who is answerable.

Someone finally speaks.

Not forcefully. Not defensively.

They describe the timeline — the early decisions, the shortcuts, the growing friction. 
They avoid blame. They don’t simplify.

It’s the hardest version of the truth.

The external party nods slowly.

Then they ask the next question.

“Who is coordinating this?”

No one answers.

Not immediately.

And in that pause, something important becomes visible:

The system has influence.
 It has explanations.
 It has momentum.

But it has no recognized center.

Dry Internal Aside
'That’s going to be a problem.'

The external party closes their notebook.

“Until that changes,” they say, “we’ll need a single point of contact.”

They don’t assign one.

They request one.

And that’s worse than choosing.

The meeting ends with a deadline.

Not aggressive.
 Not negotiable.

The room empties more slowly than usual.

People avoid each other’s eyes — not out of guilt, but calculation.`
    }
  ],
      choices: [
        { id: "respond_audit", label: "Continue", flags: ["audit_request"], next: "act5_scene3" }
      ]
    },

    act5_scene3: {
      id: "act5_scene3",
      text: `
SCENE 3: The Hand You Don’t See`,
	enterActions: [
    {
      // If player entered Sub-Level
      ifFlag: "Path_Avoidance_Active",
      text: `
The Sub-Level gets quieter. That’s the first sign.

No more panicked overrides. No more contradictory commands hitting the queue. The chaotic data spikes you saw in Scene 1 and 2 are being smoothed out—not by the hardware, but by someone at the source.

The incoming tasks are pre-filtered now. The messy, granular details that used to trigger alerts are being "repackaged" before they even reach your terminal.

Dry Internal Aside 
'Oh. Someone’s optimizing the input. They’re sanitizing the disaster.'

You watch the network traffic. Certain nodes—the ones where people used to ask "Clarifying Questions"—are being bypassed. Data is being routed through "Confirmed" channels only.

Not truth. Credibility.

(Veil Lift — Tactical) 
	Power doesn’t need visibility. It needs routing.

Dry Internal Aside 
'If this were a game, this would be the optimal play. They aren't fixing the leak; they're just rerouting the sensors so the alarm doesn't trip.'

The progress reports on your screen look beautiful. Green across the board. The external audit should be satisfied. But the heat in the room hasn't dropped. The system is still straining; the friction is just being "handled" elsewhere.

Dry Internal Aside 
'It’s control without consent. And it’s incredibly efficient.'`
    },
    {
      // If player stayed on main floor (didn't accept sideways step)
      ifFlag: "Path_Avoidance_Inactive",
      text: `
Nothing changes on the surface.

That’s the first sign.

No announcements.
 No volunteers.
 No sudden coordination.

Just… motion.

Small conversations happen off-schedule. Decisions get pre-aligned before meetings. Certain objections never quite make it into the room anymore — not because they’re silenced, but because they’re redirected early.

You notice patterns tightening.

Dry Internal Aside
'Oh. Someone’s optimizing.'

It’s subtle enough that most people experience it as relief.

Things feel smoother.
 Less friction.
 Decisions land faster again.

The comforting explanation regains ground — but refined now. More careful. Less absolute. Just enough complexity added to sound responsible.

Not truth.

Credibility.

You watch how influence moves.

Not through authority —
 through coordination.

Someone knows who needs reassurance.
 Someone knows which concerns to acknowledge publicly and which to resolve privately.
 Someone is shaping outcomes without ever owning them.

(Veil Lift — Tactical)
Power doesn’t need visibility.
 It needs routing.

You don’t know exactly who it is.

That’s intentional.

But you see the fingerprints:

	- Certain ideas advance unusually smoothly


	- Certain questions always get “handled”

	
	- Certain people stop being invited to key moments


No rules were broken.

That’s the brilliance of it.

Dry Internal Aside
'If this were a game, this would be the optimal play.'

The deadline still approaches.

Externally, things look better. Progress reports improve. Confidence returns — cautiously, but convincingly.

Internally, the fracture hasn’t healed.

It’s been covered.

One explanation is now being curated, not debated.

And because it works just well enough, no one rushes to challenge it.

You feel the weight of the moment — not urgency, not calling.

Recognition.

This isn’t chaos.

It’s control without consent.
`
    }
  ],
      choices: [
        { id: "continue5_3", label: "Continue", next: "act5_scene4" }
      ]
    },

    act5_scene4: {
      id: "act5_scene4",
      text: `
SCENE 4: A Quiet Admission`,
	enterActions: [
    {
      // If player entered Sub-Level
      ifFlag: "Path_Avoidance_Active",
      text: `
They don’t come to the basement dramatically. No secrecy theatrics. Just… timing.

It’s the technician—the one who brought you down here to "escape" the noise. They sit on the edge of a server rack when the shift finally ends.

“I don’t think this is working,” they say. Not angry. Just tired.

They hesitate, looking at the cooling fans. “The data coming in is too clean. I’ve been looking at the logs from the upper floors. Every time a hardware error pops up, someone upstream is 'adjusting' the tolerance before the audit sees it. The system looks perfect on your screen, but the fans are still screaming.”

They glance at you, then away. “That shouldn’t feel reassuring. But it does. I can actually breathe for the first time in weeks. And that’s what worries me.”

Dry Internal Aside 
'Ah. The moment doubt finds language.'

(Veil Lift — Interpersonal) 
	When control becomes invisible, the first resistance is recognition.

“I thought I was imagining it,” they admit. “But every time I try to trace an override back to an actual person, it just… disappears into a generic admin ID.”

Dry Internal Aside 
'When people stop knowing where to speak, they start choosing who to trust.'

Before leaving, they say one last thing: “If someone is coordinating this logic... they’re very good. They’re protecting us. But I don't know what they're protecting us from anymore.”`
    },
    {
      // If player stayed on main floor (didn't accept sideways step)
      ifFlag: "Path_Avoidance_Inactive",
      text: `
They don’t come to you dramatically.

No urgency.
 No secrecy theatrics.

Just… timing.

They sit beside you when the space finally empties. The kind of moment that only happens when someone has decided not to pretend anymore.

“I don’t think this is working,” they say.

Not angry.
 Not accusing.

Tired.

They hesitate — not about whether to speak, but about how much.

“Things feel smoother,” they continue, choosing words carefully. “But I can’t tell who’s deciding anything anymore. Every concern gets handled before it reaches the room.”

They glance at you, then away.

“That shouldn’t feel reassuring. But it does. And that’s what worries me.”

Dry Internal Aside
'Ah. The moment doubt finds language.'

You don’t answer immediately.

You don’t need to.

They’re not asking you to fix anything.

They’re asking whether the feeling is shared.

(Veil Lift — Interpersonal)
When control becomes invisible,
 the first resistance is recognition.

They exhale — a small release.

“I thought I was imagining it,” they admit. “But every time I try to trace a decision back, it just… disappears.”

They shake their head.

“I don’t even know who to talk to about it anymore.”

That lands.

Because it means the system has succeeded — structurally — and failed — relationally.

Dry Internal Aside
'When people stop knowing where to speak,
 they start choosing who to trust.'

They don’t ask you to act.

They don’t name anyone.

They just sit with the discomfort long enough for it to be real.

Before leaving, they say one last thing — quietly, almost to themselves:

“If someone is coordinating this… they’re very good.”`
    }
  ],
      choices: [
        { id: "continue5_4", label: "Continue", next: "act5_scene5" }
      ]
    },

    act5_scene5: {
      id: "act5_scene5",
      text: `
SCENE 5: THE FILTERED TRUTH`,
	enterActions: [
    {
      // If player entered Sub-Level
      ifFlag: "Path_Avoidance_Active",
      text: `
The deadline hasn’t changed. The Sub-Level is quiet—unnervingly so. The frantic error logs from last week have vanished, replaced by a steady stream of "Optimized Data Packets." You aren't seeing the raw sensor feeds anymore; you’re seeing the summaries. 

Dry Internal Aside 
'Someone put a lens between me and the hardware. It’s a very clean lens.'

Externally, progress reports look better.
 Internally, the system feels tighter — quieter.

You start noticing how information reaches you now.

Not late.
 Not early.

Filtered.

Some details arrive summarized.
 Others don’t arrive at all.

Not by accident.

You realize you’re missing context.

How do you respond?
`
    },
    {
      // If player stayed on main floor (didn't accept sideways step)
      ifFlag: "Path_Avoidance_Inactive",
      text: `
The deadline hasn’t changed. The office feels tighter—quieter. People aren't arguing in the halls; they’re nodding in doorways. You aren't invited to the "Pre-Meetings" where the friction is smoothed out. You’re only getting the minutes. 

Dry Internal Aside 
'Someone is curating my reality. They’re doing it for my own comfort, which is insulting.'

Externally, progress reports look better.
 Internally, the system feels tighter — quieter.

You start noticing how information reaches you now.

Not late.
 Not early.

Filtered.

Some details arrive summarized.
 Others don’t arrive at all.

Not by accident.

You realize you’re missing context.

How do you respond?`
    }
  ],
      choices: [
        { id: "accept_summaries", label: "Accept the summaries (Let efficiency win)", flags: ["compliance"], next: "act5_scene5b" },
        { id: "cross_check", label: "Cross-check quietly (Verify)", flags: ["verification"], next: "act5_scene5b" },
        { id: "ask_directly", label: "Ask directly (Request full context)", flags: ["visibility"], next: "act5_scene5b" },
        { id: "ignore_it", label: "Ignore it (Adapt later)", flags: ["delay"], next: "act5_scene5b" }
      ]
    },

    act5_scene5b: {
      id: "act5_scene5b",
      text: `
The next meeting is scheduled sooner than expected.

Shorter agenda.
 Tighter language.

Someone else speaks for a concern you remember being raised earlier.

They get it mostly right.

Mostly.`,
      choices: [
        { id: "correct_detail", label: "Correct the detail", flags: ["correct_detail"], next: "act5_scene6" },
        { id: "let_it_stand", label: "Let it stand", flags: ["let_it_stand"], next: "act5_scene6" },
        { id: "reframe", label: "Reframe instead", flags: ["reframe"], next: "act5_scene6" },
        { id: "say_nothing", label: "Say nothing", flags: ["say_nothing"], next: "act5_scene6" }
      ]
    },

    act5_scene6: {
      id: "act5_scene6",
      text: `
SCENE 6: DRAFTS AND PERMISSIONS`,
	enterActions: [
    {
      // If player entered Sub-Level
      ifFlag: "Path_Avoidance_Active",
      text: `
The external follow-up arrives sooner than expected. It’s not a video call this time. It’s a Draft Transmission.

The external auditors have requested a specific hardware-stress log. The request is being routed through the internal "Optimization" filter first. You see the packet on your screen before it’s sent.

It’s… careful. The spikes are smoothed. The failures are categorized as "Scheduled Maintenance." It’s accurate enough to pass, but incomplete enough to protect the upstairs narrative.

Dry Internal Aside 
'The math is correct, but the story is a lie. Someone is very good at selective accounting.'

The request is narrow. Precise. Delivered politely with a deadline attached. It is incomplete enough to protect someone, but professional enough to look like cooperation.`
    },
    {
      // If player stayed on main floor (didn't accept sideways step)
      ifFlag: "Path_Avoidance_Inactive",
      text: `
The external follow-up arrives sooner than expected. Not a meeting this time. A Draft Memo.

The external party wants a status clarification on a specific project risk. The response is being routed through the internal "Communications" channel first. You see the draft before it’s finalized.

It’s… careful. Accurate enough to pass. Incomplete enough to protect the managers.

Dry Internal Aside 
'It’s the kind of truth that doesn't actually say anything. It’s a masterpiece of defensive writing.'

The request is narrow. Precise. Delivered politely with a deadline attached. It is incomplete enough to protect someone, but professional enough to look like cooperation.`
    }
  ],
      choices: [
        { id: "suggest_clarify", label: "Suggest a minor clarification", flags: ["precision"], next: "act5_scene6b" },
        { id: "leave_untouched", label: "Leave it untouched", flags: ["non_interference"], next: "act5_scene6b" },
        { id: "privately_flag", label: "Privately flag a risk", flags: ["backchannel"], next: "act5_scene6b" },
        { id: "rewrite", label: "Rewrite a section entirely", flags: ["disruption"], next: "act5_scene6b" }
      ]
    },

    act5_scene6b: {
      id: "act5_scene6b",
      text: `
The clarification is sent.

Externally, the response is neutral.

Internally, something shifts.

You notice it in scheduling.
 In who gets looped in.
 In who suddenly has “context.”

The unseen hand adjusts.

You realize this pattern will repeat unless something changes.

What do you prepare next?`,
      choices: [
        { id: "prepare_info", label: "Prepare Info (track inconsistencies)", flags: ["prep_info"], next: "act5_scene7" },
        { id: "prepare_people", label: "Prepare People (watch for uneasy allies)", flags: ["prep_people"], next: "act5_scene7" },
        { id: "prepare_position", label: "Prepare Position (manage visibility)", flags: ["prep_position"], next: "act5_scene7" },
        { id: "prepare_nothing", label: "Prepare Nothing (wait)", flags: ["prep_nothing"], next: "act5_scene7" }
      ]
    },

    // SCENE 7 — THE FAULT LINE SNAPS (updated)
    act5_scene7: {
      id: "act5_scene7",
      text: `
SCENE 7: THE FAULT LINE SNAPS

The auditors cross-reference data. The lens begins to crack. Your earlier preparation produces consequences.`,
      enterActions: [
        // Path branch (Sub-Level vs Main)
        {
          ifFlag: "Path_Avoidance_Active",
          text: `
The Sub-Level is no longer quiet. The "Optimized Packets" are failing. The external auditors didn't just accept the draft; they cross-referenced it against the raw power-draw from three weeks ago.

Red text floods your terminal. The "Lens" is cracking.

Dry Internal Aside: 'The auditors didn't bring a notebook this time. They brought a forensic tool.'`
        },
        {
          ifFlag: "Path_Avoidance_Inactive",
          text: `
The office is loud. The "Pre-Meetings" have failed. The external auditors returned with a timeline that doesn't match the "Careful Memo" sent last week.

People are no longer nodding in doorways; they are closing doors. The "Comforting Explanation" has finally run out of room to breathe.

Dry Internal Aside: 'The polite facade didn't break. It just evaporated.'`
        },

        // Payoff branches — apply exactly one payoff based on prep flags (these will add payoff_* flags)
        {
          ifFlag: "prep_info",
          addFlags: ["payoff_info"],
          text: `
Because you tracked inconsistencies, you see exactly where the lie failed. You aren't surprised. You have the data logs and the emails that the "Unseen Hand" tried to route around.

(Veil Lift — Tactical)
 Knowledge isn't power until the consensus fails.`
        },
        {
          ifFlag: "prep_people",
          addFlags: ["payoff_people"],
          text: `
You notice the person from Scene 4 (the technician/colleague) standing by the exit. They look at you with a recognition that speaks of shared doubt. You have a quiet ally.

(Veil Lift — Tactical)
 Alliances travel where reports can't.`
        },
        {
          ifFlag: "prep_position",
          addFlags: ["payoff_position"],
          text: `
You've managed your visibility. As auditors begin pulling people aside, your name isn't top of the list. You watch the first wave of panic from the safety of the perimeter.

(Veil Lift — Tactical)
 Visibility is a resource.`
        },
        {
          // default payoff when no prep flags were set
          default: true,
          addFlags: ["payoff_none"],
          text: `
You are as blind as the rest of them. The system is revealing itself through chaos. You have flexibility, but no anchor.

(Veil Lift — Tactical)
 Flexibility without information is exposure.`
        }
      ],
      choices: [
        { id: "continue5_7", label: "Continue", next: "act5_scene8" }
      ]
    },

    act5_scene8: {
      id: "act5_scene8",
      text: `
SCENE 8: THE SHADOW COORDINATOR`,
	enterActions: [
    {
      // If player entered Sub-Level
      ifFlag: "Path_Avoidance_Active",
      text: `
The Sub-Level lights flicker. A person walks down the stairs—the architect of the "Lens." They sit.

“The auditors want a name,” they say. “And the system just found yours.”

They turn the terminal toward you. A prompt is blinking. It isn't a dialogue box. It's an Authorization Override.

Dry Internal Aside 
'The game is over. The work begins.'`
    },
    {
      // If player stayed on main floor (didn't accept sideways step)
      ifFlag: "Path_Avoidance_Inactive",
      text: `
The Shadow leads you to a corner. They hand you a tablet.

“The interview is in three minutes,” they say. “The Auditor is already looking at your activity logs. You need to categorize your ‘Involvement’ before the file locks.”

Dry Internal Aside 
'Identity isn't a secret anymore. It’s a variable.'`
    }
  ],
      choices: [
        { 
			id: "cmd_purge", 
			label: "[COMMAND: PURGE] Wipe backchannel logs (Protect stability)", 
			flags: ["cmd_purge"], 
			postText:`
You execute the purge.   

The backchannel logs vanish from view. The audit feed smooths for a moment. Upstairs breathes easier.

But somewhere in the Sub-Level, a technician looks at you with a new wariness.

You bought stability at the cost of truth integrity.`,
			next: "act6_start" },
        { 
			id: "cmd_delegate", 
			label: "[COMMAND: DELEGATE] Expose the Hand (Expose & destabilize)", 
			flags: ["cmd_delegate"], 
			postText:`
You attach the Shadow’s ID to the optimization history.
            
Names and timestamps cascade into the auditor's dashboard. The hand is exposed — messy, human, fallible.
            
The organization reels. Structural stability shudders.
            
You have made a choice that will force a fight.`,
			next: "act6_start" },
        { 
			id: "cmd_broadcast", 
			label: "[COMMAND: BROADCAST] Release raw data (Trigger fracture)", 
			flags: ["cmd_broadcast"], 
			postText:`
You release the raw data across the floor.
            
Screens flicker as the unfiltered logs replicate. Conversations stop. The fracture becomes visible, loud and immediate.
            
Safety is compromised. Honesty spreads.
            
You initiated a fracture with your own hands.`,
			next: "act6_start" },
        { 
			id: "cmd_abstain", 
			label: "[COMMAND: ABSTAIN] Do nothing (Let auditors decide)", 
			flags: ["cmd_abstain"], 
			postText:`
You do nothing to the file. You submit it unchanged and let the auditors decide.
            
The file moves into review without your signature. You feel the weight of agency slip away — both a relief and a cost.
            
You chose to preserve your options by not choosing.`,
			next: "act6_start" }
      ]
    }
  }
};
