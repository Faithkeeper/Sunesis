// =======================
// ACT 4 — WHAT THIS ACTUALLY IS (web port)
// =======================

window.ACT4 = {
  id: "act4",
  start: "act4_scene1",
  scenes: {
    act4_scene1: {
      id: "act4_scene1",
      text: `
=== ACT 4 — WHAT THIS ACTUALLY IS ===

SCENE 1: WHAT THIS ACTUALLY IS

The interruption doesn’t give answers.

That’s deliberate.

What it gives instead is permission.

After that moment, people start asking different questions. Not aloud — not yet — but the kind that sit behind the eyes longer than usual. Conversations don’t accelerate anymore. They hesitate.

You notice it everywhere.

Reality hasn’t changed.
 Interpretation has.

That’s worse, you think. And better.

You find yourself replaying the newcomer’s words.
	“None of this is ready.”

Ready for what?

The awareness responds — not with clarity, but with contrast. You begin to notice how different people carry it differently. Some feel sharpened by it. Others feel restless. A few feel… heavier, like they’re holding something they don’t know how to set down.

This isn’t a gift.

It’s a burden distribution problem.

Dry Internal Aside
'Fantastic.
 Turns out the real mystery is logistics.'

You cross paths with the newcomer again sooner than expected.

They don’t approach you.

They let you approach them.

That choice matters.

“You stopped something back there,” you say. “Without explaining anything.”

They nod. “Explanation collapses too much at once.”

“That sounds intentional.”

“It is.”

They glance at you, measuring.

“You’re trying to understand what this is,” they say. “Not how to use it.”

“That depends,” you reply. “On what ‘this’ is.”

A pause.

Then — the first real reveal.

The First Truth (Carefully Given)

“This isn’t awakening,” they say.
 “And it isn’t enlightenment.”

Good. That rules out several disasters.

“It’s alignment sensitivity,” they continue. “Most people operate on assumptions that stay stable enough to function. You’re perceiving when those assumptions are about to break.”

“That’s it?” you ask.

They almost smile.

“That’s enough.”

(Veil Lift — Foundational)
	You are not seeing the future.
	 You are sensing when the present is lying to itself.

The words rearrange everything.

The convergence.
 The manipulation.
 The acceleration.
 The friction.

All of it suddenly makes sense without becoming smaller.

“You can’t teach this directly,” they add. “And you can’t remove it once it’s active.”

“Then why intervene at all?” you ask.

“Because,” they say, “without structure, people confuse sensitivity for authority.”

Your mind jumps immediately to the manipulator.

They notice.

“Yes,” they say calmly. “And to you, if you’re not careful.”

Dry Internal Aside
'Good to know I’m on the watchlist.'

They turn to leave.

“One more thing,” you say. “Why now?”

They stop.

“Because the number of sensitive individuals has crossed a threshold,” they reply. “And systems don’t tolerate that quietly.”

They look back at you.

“Act 3 was about interference,” they say.
 “Act 4 is about meaning.”

Then they’re gone.`,
      choices: [
        { id: "inner_align_choice", label: "Reflect (internal alignment)", next: "act4_scene2" }
      ]
    },

    act4_scene2: {
      id: "act4_scene2",
      text: `
SCENE 2: CONNECTING DOTS YOU DIDN'T KNOW WERE DOTS

Nothing new happens.

That’s what makes it unsettling.

No meetings. No confrontations. No dramatic revelations delivered at convenient moments. Life continues with almost insulting normality.

And yet —

Your inner narration changes.

You start catching yourself before reacting. Not because you’re cautious, but because you recognize the pattern forming a second earlier than usual.

Someone begins a sentence already convinced of its conclusion.

You feel it.

A plan feels “obvious” to everyone involved — which now registers as a warning sign, not a relief.

You pause.

When did certainty start feeling suspicious?

Dry Internal Aside
'I miss being confidently wrong.
 It was simpler.'

You don’t gain new abilities.

You gain resolution.

You begin to notice how often people confuse:

	- speed with clarity

	- confidence with alignment

	- consensus with truth

And worse — how comforting those confusions are.

The awareness doesn’t speak.

It arranges.

Moments line up retroactively. Past scenes recontextualize themselves without being rewritten.

The convergence wasn’t about recruiting.

It was about filtering.

The manipulator wasn’t malicious.

They were optimized.

And the newcomer wasn’t a savior.

They were a constraint.

You realize something quietly, almost unwillingly:

This has happened before.

Not to you —
 to systems.

(Veil Lift — Internal, Player-Owned)
When awareness rises faster than wisdom,
 structure rushes in to compensate.

No one told you this.

You recognized it.

You stop walking mid-thought.

That’s why it feels religious, you think — without being religion.

Frameworks emerge whenever perception outpaces meaning.

People don’t want truth.

They want something that lets them keep moving.`,
      choices: [
        { 
			id: "responsibility", 
			label: "This is about responsibility", 
			flags: ["inner_align_responsibility"], 
			postText:`
Dry Internal Aside (locked, regardless of choice)
'I was hoping for a manual.
 Turns out I’m supposed to become one.`,
			next: "act4_scene3" },
        { 
			id: "stewardship", 
			label: "This is about stewardship", 
			flags: ["inner_align_stewardship"], 
			postText:`
Dry Internal Aside (locked, regardless of choice)
'I was hoping for a manual.
 Turns out I’m supposed to become one.`,
			next: "act4_scene3" },
        { 
			id: "survival", 
			label: "This is about survival", 
			flags: ["inner_align_survival"], 
			postText:`
Dry Internal Aside (locked, regardless of choice)
'I was hoping for a manual.
 Turns out I’m supposed to become one.`,
			next: "act4_scene3" },
        { 
			id: "revelation", 
			label: "This is about revelation", 
			flags: ["inner_align_revelation"], 
			postText:`
Dry Internal Aside (locked, regardless of choice)
'I was hoping for a manual.
 Turns out I’m supposed to become one.`,
			next: "act4_scene3" }
      ]
    },

    act4_scene3: {
      id: "act4_scene3",
      text: `
SCENE 3: MISALIGNMENT IN THE WILD

You start noticing it away from yourself.

That’s the difference.

Not how people react to you, but how they react to each other when awareness brushes too close to the surface.

Someone raises a concern — carefully, reasonably. Not an accusation. Just a pause in momentum.

The response comes quickly.

Too quickly.

“It’s probably nothing,” someone says. “We’re just overthinking it.”

That line lands differently now.

Not because it’s wrong — but because of when it appears.

You don’t intervene.

You don’t need to.

You already know what will happen next.

Dry Internal Aside
'I’m starting to recognize this sentence the way you recognize smoke.'

The discussion moves on. The discomfort gets filed away under “unproductive.” People relax. Decisions resume.

Efficient.

And subtly worse.

Later, the consequences surface — not catastrophically, just… persistently. Small problems compound. The same issue resurfaces under a different name.

You feel the pattern close its loop.

No one connects it.

You do.

(Veil Lift — Quiet, Internal)
Misalignment doesn’t announce itself.
 It repeats.

This isn’t about misuse of truth yet.

It’s about the avoidance of friction.

And you’re seeing how common that instinct really is.`,
      choices: [
        { id: "continue4_3", label: "Continue", next: "act4_scene4" }
      ]
    },

    act4_scene4: {
      id: "act4_scene4",
      text: `
SCENE 4: A FAMILIAR SHORTCUT

You hear the simplified explanation again.

Not yours.

Someone else’s version.

Different words. Same shape.

“Sometimes things just feel harder before they get easier,” someone says, trying to be reassuring. “You just need to adjust.”

They mean well.

That’s what makes it effective.

Dry Internal Aside
'Ah. So that’s the model version.'

You watch how it lands.

Relief. Gratitude. Resolution.

And then — quiet disengagement.

The person who raised the concern stops asking questions. Not because they’re convinced, but because the room has moved on.

You realize something important:

This explanation didn’t come from you.

It came from the environment.

The system learned it on its own.

(Veil Lift — Structural)
When pressure exists without language,
 language will emerge — accurate or not.

That’s the danger.

Not that truth gets simplified —
 but that something else fills the gap if it doesn’t.`,
      choices: [
        { id: "continue4_4", label: "Continue", next: "act4_scene5" }
      ]
    },

    act4_scene5: {
      id: "act4_scene5",
      text: `
SCENE 5: WATCHING IT HAPPEN

You’re no longer surprised when it repeats.

You’re unsettled by how predictable it is.

Different people. Same move.

Discomfort appears → explanation arrives → friction dissolves → issue returns later.

It’s not manipulation.

It’s self-preservation.

Dry Internal Aside
'People don’t avoid truth because it’s false.
 They avoid it because it’s inconvenient.'

You feel the awareness settle into a clearer shape.

Not urgency.

Not authority.

Understanding.

As this understanding settles, a man from the Logistics Tier — someone you’ve seen filing reports but never speaking — catches your eye. He gestures toward a side exit, away from the main group.

"It’s getting loud in here," he whispers. "Not the noise. The... expectation. You look like you're tired of being everyone's moral compass. There’s a quiet project starting in the Sub-Level. Pure data. No politics, no 'truth,' just keeping the lights on. I can put your name on the transfer list. No one will ask why you left the main floor."

How do you handle the pressure?`,
      choices: [
        { 
			id: "stay_and_watch", 
			label: "Stay and Watch",
			flags: ["Path_Avoidance_Inactive"],
			postText:`You stay. The fracture continues to develop around you. You are a witness.`,
			next: "act4_scene5a" },
        { 
			id: "accept_sideways", 
			label: "Accept the Sideways Step (Sub-Level)", 
			flags: ["Path_Avoidance_Active"], 
			postText:`You follow the man to the Sub-Level. The lights feel different. Relief settles in.`,
			next: "act4_scene5a" }
      ]
    },

act4_scene5a: {
      id: "act4_scene5a",
      text: `
This isn’t about correcting every instance.

It’s about recognizing why systems prefer partial answers.

And why that preference has consequences.

(Veil Lift — Earned, Internal)
Truth doesn’t spread by accuracy alone.
 It spreads by usability.

That thought stays with you.

Unresolved.

And that’s fine.`,
      choices: [
		{ id: "continue", label: "Continue", next: "act4_scene6" }
      ]
    },

   // Replace only the act4_scene6 entry in your file with the following:

act4_scene6: {
  id: "act4_scene6",
  text: `
SCENE 6: WELL-INTENDED FAILURE`,
  enterActions: [
    {
      // If player entered Sub-Level
      ifFlag: "Path_Avoidance_Active",
      text: `
The Sub-Level isn't the escape you thought it was. You can't see the faces upstairs, but you can feel the vibration of the arguments in the floorboards.

The data on your screen is starting to mirror the chaos you left behind. A request comes through for a "Priority Override." It’s a clean technical request, but the logic is flawed—someone is trying to force a result through a system that isn't ready for it.

You flag it. You provide a clear, technical explanation of why it will fail.

A minute later, the flag is cleared. No comment. No rebuttal. Just a "Noted" status update.

The override proceeds anyway.

Dry Internal Aside
'Ah. The digital version of a polite nod. Classic.'

(Veil Lift — Observed, Not Personal)
Truth that lacks leverage becomes etiquette.

Down here, the "Etiquette" is a status bar that turns green even when the math is red. The system didn't argue with your correction; it just absorbed it and kept moving.

Dry Internal Aside
'So this is why silence keeps winning. It’s cheap.'`
    },
    {
      // If player stayed on main floor (didn't accept sideways step)
      ifFlag: "Path_Avoidance_Inactive",
      text: `
You’re not involved.

That’s what makes it instructive.

Someone else notices the misalignment — not vaguely, not instinctively, but clearly. You see the recognition cross their face a second too late, like someone realizing mid-sentence that they should have spoken earlier.

They do speak.

Calm. Thoughtful. Measured.

They try to slow things down.

It goes badly.

Not explosively — worse than that.

People listen. Heads nod. Someone thanks them for “raising a good point.” Another suggests they “circle back later.”

Momentum resumes anyway.

Their intervention becomes a pause, not a pivot.

Dry Internal Aside
'Ah. The polite dismissal.
 Classic.'

You watch the aftermath.

The person who spoke looks unsettled, not because they were wrong, but because they were ineffective. They did everything right — tone, timing, wording.

Still failed.

Later, you notice them retreat slightly. Not withdrawing completely — just becoming more careful about when they speak.

They learned the wrong lesson.

(Veil Lift — Observed, Not Personal)
Truth that lacks leverage
 becomes etiquette.

That lands hard.

Because nothing punished them.

Nothing corrected them either.

The system absorbed the resistance and kept moving.

Efficiently.

You realize something crucial here:

Awareness alone doesn’t change outcomes.
 Neither does correctness.
 Not even sincerity.

What matters is whether the system can afford the friction.

And most systems can’t — at least not for long.

Dry Internal Aside
'So this is why silence keeps winning.
 It’s cheap.'

The person who intervened doesn’t look to you.

They don’t know you noticed.

And that’s important.

This isn’t about mentorship or hierarchy.

It’s about pattern recognition.`
    }
  ],
  choices: [
    { id: "continue4_6", label: "Continue", next: "act4_scene7" }
  ]
},

act4_scene7: {
      id: "act4_scene7",
  text: `
SCENE 7: WHEN EXPLANATIONS COMPETE`,
  enterActions: [
    {
      // If player entered Sub-Level
      ifFlag: "Path_Avoidance_Active",
      text: `
It doesn’t start as a debate. It starts as a data mismatch.

Two reports surface on your terminal—close enough in timing that the system can’t reconcile them. You recognize the shapes immediately.

One is Clean. > All green status bars. Aggregated. Summary-friendly. The other is Granular. > Conditional. Messy. Full of unformatted exceptions.

You watch the system logs as the "Upstairs" managers interact with the files. They instinctively gravitate toward the first.

Dry Internal Aside
'Of course they do. Nobody wants to read the footnotes of a disaster.'

A comment thread opens on the file. Someone types: "The summary looks solid. Let’s proceed with these assumptions."

Then a notification pings—someone from the technical floor adds: "Wait. The summary ignores the heat-load variance. We're ignoring a value that doesn't resolve cleanly."

The cursor in the chat box stalls. Not a crash. Tension.

Dry Internal Aside
'Ah. Two narratives enter. Only one leaves.'

You watch the system decide. Not through math—through economics. Which report requires less attention? Which one allows for a faster "Approve" click?

The clean report is approved first. People copy-paste its charts into their own presentations. It becomes shorthand. A way to end meetings that feel like they’re dragging.

The granular report lingers. Not deleted. Just… unread.

(Veil Lift — Structural, Observed)
In competing explanations, the one that preserves momentum wins — not the one that preserves truth.

Dry Internal Aside 
'Smart. Painful, but smart. The server doesn't care if the data is a lie, as long as the throughput is steady.'

The technical user who raised the red flag stops typing. They don't delete their comment; they just go offline.

You feel the misalignment persist in the hardware—quiet, unresolved, patient. Waiting.`
    },
    {
      // If player stayed on main floor (didn't accept sideways step)
      ifFlag: "Path_Avoidance_Inactive",
      text: `
It doesn’t start as a debate.

It starts as overlap.

Two explanations surface in the same space — close enough in timing that neither can fully settle before the other arrives. You recognize both shapes immediately.

One is comforting.
 Concise.
 Actionable.

The other is messier.
 Conditional.
 Incomplete.

People instinctively gravitate toward the first.

Of course they do.

Someone says it plainly, with confidence that sounds like relief:

“This is just a transitional phase. Things always feel unstable before they normalize.”

Heads nod.

Then someone else — not defiant, not emotional — adds quietly:

“Or they feel unstable because we’re ignoring something that doesn’t resolve cleanly.”

The room stalls.

Not silence.

Tension.

Dry Internal Aside
'Ah. Two narratives enter.
 Only one leaves.'

You watch the system decide.

Not through argument — through economics.

Which explanation:

	- Requires less attention?


	- Allows faster decisions?


	- Produces fewer follow-up questions?


The comforting one spreads first.

People repeat it — not verbatim, but faithfully. It becomes shorthand. A way to end conversations that feel like they’re dragging.

The second explanation lingers.

Not disproven.

Just… unused.

(Veil Lift — Structural, Observed)
In competing explanations,
 the one that preserves momentum wins —
 not the one that preserves truth.

Something unexpected happens next.

The person who offered the second explanation doesn’t push back.

They stop speaking.

Not in defeat — in recalibration.

You see it in their posture. They’re learning. Not about the issue — about the environment.

That’s new.

Dry Internal Aside
'Smart.
 Painful, but smart.'

The discussion concludes.

A decision is made.

It’s not catastrophic. It’s not obviously wrong.

It’s just… shallow.

You feel the misalignment persist — quiet, unresolved, patient.

Waiting.`
    }
  ],
  choices: [
        { id: "continue4_7", label: "Continue", next: "act4_scene8" }
      ]
    },
     
    act4_scene8: {
      id: "act4_scene8",
      text: `
SCENE 8: THE FIRST SPLIT (CLOSING)`,
  enterActions: [
    {
      // If player entered Sub-Level
      ifFlag: "Path_Avoidance_Active",
      text: `
It doesn’t look like a system crash at first. That’s why most people miss it.

The same data process runs—again—but this time, the servers don’t move as one. The primary processor sends out the familiar instruction set. It should execute.

It doesn’t.

One cluster accepts the command. One cluster hangs in a "Pending" state. A third cluster times out long enough to matter.

The workflow stalls. Not a total failure—just enough to create a latency spike that hurts to look at.

Dry Internal
'Oh. That’s new.'

Two logic paths form quietly in the logs. One group of users upstairs is forcing the "Resolution" path—fast, clean, ignoring the errors. They want the data that lets them move forward without reopening questions they don’t have time to answer.

The other group of users doesn’t flag a "Stop." They just keep requesting diagnostic logs. Not many. Not loudly. But they won't let the shortcut execute.

No one sends an angry email. No one declares a bug. And yet, the system has split.

(Veil Lift — Structural, Final for Act 4)
Systems don’t fracture through disagreement. They fracture through incompatible tolerances for uncertainty.

Dry Internal Aside Well.
'That’s going to complicate everything.'

Later, you notice the consequences in the hardware. The workload is double now—the system is trying to maintain two versions of the same truth. Cooling fans in the Sub-Level ramp up, a low hum that sounds like a sustained scream.

Efficiency drops. Heat rises. And for the first time, the "Incomplete" data doesn't get overwritten. It just… persists.

Dry Internal Aside
'Truth didn’t arrive as revelation. It arrived as a synchronization error.'`
    },
    {
      // If player stayed on main floor (didn't accept sideways step)
      ifFlag: "Path_Avoidance_Inactive",
      text: `
It doesn’t look like conflict at first.

That’s why most people miss it.

The same issue resurfaces — again — but this time, the room doesn’t move as one. The familiar explanation is offered, smoothly and confidently. It should land.

It doesn’t.

A few people nod.
 A few don’t.
 Someone hesitates long enough to matter.

The decision stalls.

Not dramatically — just enough to create discomfort.

Dry Internal Aside
'Oh.
 That’s new.'

Two paths form quietly.

One group leans toward resolution — fast, clean, reassuring. They want the explanation that lets them move forward without reopening questions they don’t have time to answer.

The other group doesn’t argue.

They ask clarifying questions.

Not many.
 Not loudly.

But they don’t let the shortcut settle.

No one raises their voice.
 No one declares sides.

And yet, the room has split.

(Veil Lift — Structural, Final for Act 4)
Systems don’t fracture through disagreement.
 They fracture through incompatible tolerances for uncertainty.

The meeting ends awkwardly.

Not unresolved — differently resolved.

People leave with different understandings of what just happened. Different expectations. Different assumptions about what comes next.

That’s the fracture.

Not a break — a fault line.

Later, you notice the consequences.

Conversations happen twice now — once in each current. Decisions get revisited unexpectedly. What was “settled” in one space is reopened in another.

Efficiency drops.

Tension rises.

And for the first time, the harder explanation doesn’t disappear.

It just… doesn’t win everywhere.

Dry Internal Aside
'Well.
 That’s going to complicate everything.'

You don’t feel responsible.

You also don’t feel detached.

You understand what’s happening — and more importantly, why it couldn’t have happened sooner.

Truth didn’t arrive as revelation.

It arrived as division.`
    }
  ],
      choices: [
        { id: "complete_act4", label: "Acknowledge", next: "act5_start" }
      ]
    }
  }
};
