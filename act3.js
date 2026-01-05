// =======================
// ACT 3 — CARRYING CONTEXT (web port)
// =======================

window.ACT3 = {
  id: "act3",
  start: "act3_scene1",
  scenes: {
    act3_scene1: {
      id: "act3_scene1",
      text: `
=== ACT 3 — CARRYING CONTEXT ===

SCENE 1: THE WEIGHT

The city feels different today. It’s not just the noise; it’s the rhythm. You can feel the "friction" of the people passing you like static electricity. You aren't just a pedestrian anymore; you're a carrier.

How do you navigate the walk to the next site?`,
      choices: [
        { 
			id: "edge_walk", 
			label: "Stay on the edge of the sidewalk (Observation)", 
			stats: { sunesis: 1 },
			postText:`You see the patterns of the street clearly, but you feel isolated.`,
			next: "act3_scene1a" },
        { 
			id: "center_walk", 
			label: "Push through the center (Authority)", 
			stats: { authority: 1 }, 
			postText:`You feel the "tug" of a dozen different contexts. It’s exhausting, but you feel the weight of your own presence.`,
			next: "act3_scene1a" },
        { 
			id: "alley_walk", 
			label: "Take the long way (Discovery)", 
			stats: { discovery: 1 }, 
			postText:`You find a moment of silence, but the "Veil" feels thinner in the dark. You notice things—details on the walls—that others miss.`,
			next: "act3_scene1a" }
      ]
    },

    act3_scene1a: {
      id: "act3_scene1a",
      text: `
You don’t feel different walking away.

That’s the unsettling part.

No surge of confidence. No sense of promotion. Just the faint irritation of having agreed to something without fully understanding the workload.

Context, you think.
  I’ve carried worse. Usually by accident.

The city greets you the same way it always does — impatient, distracted, unconcerned with whatever invisible responsibility you’re now apparently holding on its behalf. Traffic behaves. People behave. Reality keeps its usual schedule.

And yet, you notice more.

Not new things — earlier things.

Moments just before someone commits to a decision. That half-second where an assumption hardens. The quiet confidence people adopt right before they’re wrong.

It’s like watching dominos that haven’t fallen yet.

Across the street, two people are arguing — not loudly, not emotionally. The kind of disagreement that pretends to be about logistics but is really about control. One of them is convinced they’ve “figured it out.”

They haven't.

You know this without knowing why. Not certainty — alignment. The same misfit you noticed back at the convergence.

The moment stretches.

No one looks at you.
 No one expects anything from you.

Which somehow makes this worse.

This is what he meant, you realize.
 Not leadership. Interference.

Just… timing.

You’re close enough to intervene casually. Far enough to keep walking.`,
      choices: [
        { 
			id: "say_small", 
			label: "Say something small", 
			flags: ["partial_int"], 
			postText:`
			Dry Internal Aside
"So this is how it starts.
 No ceremony. No training montage.
 Just awkward social responsibility."
 
You decide to intervene — but not decisively.
            
Just enough to disturb momentum.
            
You step closer, pretending you were already part of the environment. Your tone is casual, almost careless.
            
Not abruptly. Not dramatically.
            
“Hey,” you say, gesturing vaguely, “are you sure that’s the part that actually matters?”
            
Both of them pause.
            
Not because you’re persuasive —
 but because the question doesn’t fit their script.
            
One of them frowns. “What do you mean?”
            
You shrug. “I might be wrong. It just sounded like you skipped a step.”
            
That’s it.
            
No explanation. No authority. No conclusion.
            
For a moment, it works.
            
The tension loosens. They glance at each other, recalibrating. The certainty that had been hardening a second ago softens into irritation — then into thought.
            
You feel it immediately.
            
Alignment shifts.
            
Not fixed.
 Not broken.
           
Delayed.
            
Then one of them scoffs lightly. “No, I’m pretty sure I’ve got it.”
            
The conversation resumes — slower now, but still pointed. Still headed in the same direction.
            
You step back.
            
Not satisfied — but not regretful either.
            
This wasn’t a failure.
            
It was a partial intervention.

[RESULT: MILD STING]

Later that day, the awareness returns

You notice the same pattern elsewhere — not identical, but related. The same skipped step. The same premature certainty.

You understand something new:
Intervening weakly doesn’t stop momentum.
It just teaches you where resistance actually lives.

A veil lifts quietly:
Timing matters — but so does clarity.
You didn’t make things worse. \nBut you didn’t resolve them either.

And now you know why.

Dry Internal Aside
'Good. I’ve officially helped just enough to be noticed. I can feel the weight of the context now—it's not just a thought anymore, it's a target.'`,
			next: "act3_scene2" },
        { 
			id: "stay_silent_act3", 
			label: "Stay silent", 	
			flags: ["silent_obs"],
			postText:`
			
			Dry Internal Aside
"So this is how it starts.
 No ceremony. No training montage.
 Just awkward social responsibility."
 
The argument behind you escalates. You hear the sharp, jagged sound of glass hitting pavement—a dropped bottle, or perhaps a window. You don’t turn around. You keep your eyes on the pavement, focusing on the rhythmic sound of your own footsteps.
            
You told yourself this was about restraint. You told yourself that "holding context" meant not interfering with the natural flow of the world.
            
(Veil Lift — Cold, Sharp) 
Restraint that ignores a scream isn't balance. It's absence.
            
The "Natural" world feels thinner now, like a movie set where the background actors have stopped following the script. You feel a cold weight settling in your chest—a "Negative Alignment." By refusing to use the authority you were given, you’ve left a vacuum
            
Dry Internal Aside 
'I feel like I just watched a train wreck in slow motion and decided to check my watch instead of pulling the lever. I’m not sure if I’m being wise or just a coward.'
            
As you reach the corner, the air feels heavy. The "Shadows" of the people passing you seem more erratic, as if they are reacting to the chaos you left behind. You realize that in this world, neutrality has a price.

[RESULT: STERN VOID]`,
			next: "act3_scene2" },
        { 
			id: "redirect", 
			label: "Redirect (physical)", 	
			flags: ["redirect_ghost"],
			postText:`
			
			Dry Internal Aside
"So this is how it starts.
 No ceremony. No training montage.
 Just awkward social responsibility."
 
You don’t walk toward them, and you don’t speak. Instead, you look at the environment. You notice a stack of empty crates near the shop entrance, balanced precariously. You shift your weight as you pass, your foot catching the corner of the bottom pallet—just enough to send the top crate sliding.
            
It hits the pavement with a hollow, echoing thwack just as the customer opens their mouth to shout.
            
The sound is a physical reset button. Both of them jump. The jagged "Shadow" vibrating around the customer snaps, losing its rhythm. They blink, the sudden noise having shocked them back into their own skin. By the time they look toward the source of the noise, you are already ten paces away, checking your phone as if you didn't notice a thing.
            
(Veil Lift — Precise, Weightless) 
The most effective influence is the one that leaves no fingerprints.
            
You feel a strange, clean hum in your chest—an Alignment Bonus. You didn't just hold the context; you repaired it without drawing blood or attention.
            
Dry Internal Aside 
"Physics is a great diplomat. It doesn't argue, and it doesn't leave a paper trail. I think I’m getting the hang of this 'not leading' thing."

[RESULT: CLEAN HUM]

The most effective influence is the one that leaves no fingerprints.`,
			next: "act3_scene2" }
      ]
    },

    act3_scene2: {
      id: "act3_scene2",
      text: `
SCENE 2: THE HELPFUL VOICE

You’re walking away from the storefront. Whether you left a mess behind or a quiet repair, the "sting" of the encounter is still vibrating in your chest.

But the air behind you doesn't feel empty. Someone is pacing you. Their footsteps are perfectly synchronized with yours, a rhythmic shadow that refuses to overtake you.

How do you handle the sensation of being followed?`,
      choices: [
        { 
			id: "face_them", 
			label: "Stop abruptly and turn around.", 
			stats: { authority: 1 }, 
			postText:`You pivot on your heel, facing the pressure head-on. The figure behind you doesn't flinch or look surprised. They stop exactly three paces away, meeting your eyes with a calm, unnerving steady gaze.`,
			next: "act3_scene2a" },
        { 
			id: "escape_them", 
			label: "Increase your pace and turn a sharp corner.", 
			stats: { skepticism: 1 },
			postText:`You bolt around the corner of a brick building, ducking into a narrow alcove to wait. You expect to hear running footsteps, but there is only silence. When you peak out, the street is empty—yet the "tug" in your chest tells you they haven't gone anywhere.`,
			next: "act3_scene2a" },
        { 
			id: "invite_them", 
			label: "Keep walking but slow down.", 
			stats: { sunesis: 1 }, 
			postText:`You deliberately drop your shoulders and slow your stride, creating an opening. You are inviting the interaction. The footsteps behind you move closer, no longer hiding their rhythm, until the presence is walking almost shoulder-to-shoulder with you.`,
			next: "act3_scene2a" }
      ]
    },
	
	act3_scene2a: {
      id: "act3_scene2a",
      text: `
A voice pulls you back to the physical world... “It’s heavier than it looks, isn't it?”

You don't get a chance to answer. He's gone into the crowd before you can pin him down. But you notice the pattern again twice more that day — two unrelated conversations, two different places, same outcome. Someone enters late, says very little, and leaves having nudged things just enough.

Not persuasion.
 Not leadership.

Calibration.

That’s familiar, you think. Uncomfortably so.

The third time, you’re ready.

It happens in a shared space — neutral, public, forgettable. The kind of place where decisions get made because no one wants to drag them out. A small group is stuck on a minor issue. Opinions circle. Frustration builds.

Then a voice cuts in.

Calm. Reasonable. Helpful.

“Maybe we’re overcomplicating this,” the person says. “There’s a simpler way forward.”

People latch onto it instantly.
Of course they do.

You feel the misalignment before you can articulate it. Not because the suggestion is wrong — but because it short-circuits something necessary.

This isn’t guidance.

It's a premature resolution.

You watch the speaker closely now.

They don’t push. They don’t insist. They let others carry the idea forward.

Clean. Efficient.

Intentional.

Oh, you realize. You’re not helping. You’re steering.

Internal Commentary
'I take back everything I said about being less dramatic than the alternatives.'

You catch their eye.

Just for a fraction of a second.

Recognition flickers there — gone almost immediately.

They know you noticed.

That changes things.`,
      choices: [
        {
          id: "expose_maneuver",
          label: "Expose the maneuver openly (Conflict)",
          flags: ["open_conflict"],
          postText:`
You don’t have to act immediately.
        
That’s the problem.
        
The moment stretches just long enough for other people to feel it too — the subtle discomfort that comes when a solution arrives too cleanly. A few expressions shift. Someone tilts their head, reconsidering.
        
You’re no longer alone in the perception.
        
The speaker notices as well.
        
They adjust — smoothly.
        
“Well,” they add lightly, “unless I’m missing something.”
        
That’s the tell.
        
They’re trying to give the room an exit before suspicion crystallizes.
        
You step in — not to confront, but to reframe.
        
“Maybe,” you say, evenly, “but it feels like we’re skipping the part where we find out why this keeps coming up.”
        
The room stills.
        
Not silence — attention.
        
Someone else nods slowly. “Yeah. That’s… actually true.”
        
Another voice joins in. “We keep resolving it, but it comes back.”
        
The helpful speaker smiles — polite, controlled — but their timing is off now. They didn’t expect resistance to spread this quickly.
        
You feel it clearly:
The manipulation has lost invisibility.
        
Dry Internal Aside
'Ah. There it is.
 That uncomfortable phase where everyone realizes something’s wrong but no one wants to name it.'
        
The speaker raises their hands slightly. “Fair point. I didn’t mean to rush it.”
        
They step back.
        
Too late.
        
The group doesn’t fracture — but it reorients. Questions replace conclusions. Momentum reverses.
        
You’ve done enough.
        
As people disperse, the speaker lingers.
        
They approach you casually, as if this were a coincidence.
        
“You’re paying attention,” they say.
        
Not impressed.
 Not threatened.
        
Evaluative.
 
“You should be careful,” they add. “Interfering openly changes the environment.”
        
You meet their gaze.
        
“So does steering it quietly.”
        
For the first time, they smile for real.
        
“True.”
        
Then they leave.
        
(Veil Lift — Sharp, Unsettling)
        
Later, the awareness returns — not heavy, but precise.
        
	When manipulation becomes visible,
	 it doesn’t stop.
	  It adapts.
        
You understand something crucial now:
        
This wasn’t a win.
        
It was an introduction.`,
          next: "act3_scene3"
        },
        {
          id: "counter_steer",
          label: "Counter-steer subtly (Manipulation)",
          flags: ["subtle_counter"],
          postText: `
The man looks at the fallen crate, then back at the shopkeeper who is now distracted and calm. He doesn't clap. Instead, he looks at your feet, then at the pallet you "accidentally" nudged.
       
A small, tight smile pulls at the corner of his mouth—the look of a professional who just recognized another professional.
        
"Careful," he says softly. "If you keep moving the furniture while people are sitting on it, someone’s going to eventually wonder why the floor feels different."
        
He doesn't wait for your "architect" realization; he just walks away, looking over his shoulder one last time to see if you’re still hiding. [REPUTATION UNLOCKED: THE GHOST]
        
He leans closer, and for a second, you see a flash of something in his eyes—not a shadow, but a spark of pure, focused intent. “Keep playing with the furniture, Ghost. But remember: eventually, the owner of the house is going to notice things have moved.”
        
(Veil Lift — Sharp, Electric) 
Visibility is a choice. You have chosen to be a whisper in a room full of screams.
        
Dry Internal Aside 
'He saw the crate. He saw the shift. I’m not as invisible as I thought I was.'`,
          next: "act3_scene3"
        },
		{
			id: "learn_pattern", 
			label: "Do nothing — learn their pattern (Intel)", 
			flags: ["intel_gathering"],
			postText:`
The man’s smile doesn’t reach his eyes. It’s the look of a scientist watching a predictable chemical reaction.
        
He starts to say something, then stops. He looks at your hands—resting at your sides, inactive—and his expression shifts from curiosity to a cold, clinical disappointment.
        
He doesn't lecture. He just takes a half-step back, as if you’ve suddenly become a piece of furniture.
        
"I see," he says, his voice losing its warmth. "You're one of those. You'll watch the house burn just to see how the smoke curls."
        
He turns his back on you before you can respond. [REPUTATION UNLOCKED: THE OBSERVER]
        
(Veil Lift — Heavy, Cold) \nBy refusing to act, you didn't stay neutral. You became a void. And nature abhors a vacuum.
        
Dry Internal Aside 
'I thought walking away was the smart move. Now I feel like I just gave a stranger the keys to my house and invited him to watch me sleep.'`,
			next: "act3_scene3" }
      ]
    },

    act3_scene3: {
      id: "act3_scene3",
      text: `
SCENE 3: PRESSURE APPLIED

The shift isn't immediate.

That would be sloppy.

Instead, it arrives disguised as efficiency.

Decisions get made faster. Too fast. Meetings end early. Conversations resolve themselves before disagreement has time to surface. On the surface, things look smoother than they have in a while.

People even comment on it.

“Funny how things are finally moving,” someone says. “Feels like we were overthinking everything before.”

You feel the chill immediately.

Yes, you think. That’s exactly the problem.

The helpful voice isn’t always present now — and when they are, they don’t lead. They place pressure. A suggestion here. A nudge there. Never the same approach twice.

They’re testing boundaries.

And worse — it’s working.

You witness it firsthand.

A discussion stalls — not badly, just enough to invite intervention. Before you can act, someone else steps in. Not the manipulator — someone new.

They repeat the same pattern.

Calm. Reasonable. Final.

You realize what’s happening too late.

It’s spreading.

Dry Internal Aside
'I was worried I’d be bad at this.
 Turns out I might just be outnumbered.'

Later, you cross paths with the original speaker again.

This time, they don’t pretend it’s accidental.

“You made awareness visible,” they say casually. “People adapt faster when they think they’re being clever.”

“That wasn’t the goal,” you reply.

They nod. “Intentions rarely are.”

There’s no threat in their voice.

Just inevitability.

“You can’t counter everyone.”

They’re right.

And they know it.

The environment is changing. Quiet influence is multiplying.

You must decide how to respond..`,
      choices: [
        { 
			id: "match_escalation", 
			label: "Match escalation with precision (Decisive)", 
			reputation: "THE DISRUPTOR", 
			stats: { gnosis: 2 },
			postText:`
You don’t counter everything.
            
That would be impossible.
            
Instead, you choose moments — the ones where acceleration would do the most damage. Where a decision would close doors instead of opening them.
            
You step in cleanly this time.
            
Not vague. 
 Not apologetic.
            
“Before this locks in,” you say, “we need to slow down. We’re treating momentum like evidence.”
            
A few people bristle.
            
One person exhales sharply. “We’ve already talked this to death.”
            
You meet their gaze. Calm. Grounded.
            
“Not this version of it.”
            
That’s enough.
            
Not to convince — but to interrupt.
            
The room shifts. Frustration surfaces. Someone rolls their eyes. Someone else nods, relieved they weren’t the only one uncomfortable.
            
You feel it immediately.
            
This time, the awareness doesn’t just respond.
            
It records.
            
Dry Internal Aside
"I've officially become 'that person.'  
Great. Now there's a target on my back."
            
Afterward, it’s subtle — but consistent.
            
Certain people start watching you when discussions stall. Not asking. Not inviting. Just… checking whether you’ll intervene.
            
Others avoid your eye entirely.
            
The Manipulator enters the room, but he doesn't walk toward the center like he usually does. He stops at the edge of the circle, his eyes darting to the others—who are all, unconsciously, angled toward you.
            
He hesitates, his usual smooth entrance broken. He has to physically force his way into the conversation space you've unintentionally claimed.
            
"It’s getting crowded in here," he mutters, looking at you with a new, guarded respect. "I usually have to yell to get this much attention. You did it by just standing there." 
[REPUTATION UNLOCKED: THE DISRUPTOR]
            
“That wasn’t intentional,” you reply.
            
They tilt their head slightly. “That’s what makes it effective.”
            
There’s no accusation in their voice now.
            
Only assessment.
            
“You should know,” they continue, “once people start watching you, neutrality becomes impossible.”
            
You already knew that.
            
What you didn’t realize was how fast it would happen.
            
(Veil Lift — Quiet, Heavy)
	Influence isn’t claimed.
	 It’s noticed.`,
			next: "act3_scene4" },
        { 
			id: "force_friction", 
			label: "Force friction (Slow it down)", 
			flags: ["Friction_Applied"], 
			stats: { gnosis: 1 }, 
			postText:`
You don't push against the crowd; you become a "static" point. You move slower as they move faster, or you speak a quiet, dissonant truth when they shout.
            
The "momentum" of the room doesn't break—it stutters. You create a micro-fracture in the collective energy.
            
The air around you cools. While others are swept up in the heat of the moment, your resistance creates a small, quiet pocket of clarity. You see the Manipulator in the corner—he isn't looking at the crowd anymore. He’s looking at the 'stutter' you just caused.`,
			next: "act3_scene4" },
        { 
			id: "map_network", 
			label: "Let it run — map the network", 
			reputation: "THE OBSERVER", 
			stats: { gnosis: 1 }, 
			postText:`
You do nothing to stop the flow. You simply watch the escalation play out to its logical, chaotic conclusion, refusing to tie your own emotions to the outcome.
            
The room reaches its peak tension without you. You remain "outside" the event even while standing in the middle of it.
            
The wave of noise and panic passes over you, but it doesn't pull you under. By refusing to engage, you see the system’s limits. You notice exactly where the logic breaks and where the panic becomes performative. You aren't a participant; you are the witness.`,
			next: "act3_scene4" }
      ]
    },

    act3_scene4: {
      id: "act3_scene4",
      text: `
SCENE 4: THE CONVERSATION YOU CAN'T AVOID

They don’t corner you.

That would be crude.

Instead, they time it perfectly — a lull, a natural break, the moment when leaving would look intentional. You almost respect the restraint.

“Walk with me,” they say.

Not a request.
 Not a command.

You do.

For a while, neither of you speaks. The city fills the silence — footsteps, distant traffic, a siren that sounds more dramatic than necessary.

Finally, they break it.

“You’re interfering selectively,” they say. “That tells me you’re not guessing.”

You keep your eyes forward. “And you’re accelerating outcomes you won’t have to live with.”

They nod once. “True.”

No denial. No offense taken.

That’s when you realize this isn’t a conflict of awareness.

It’s a conflict of ethics.

Dry Internal Aside
'I was expecting manipulation.
 What I got was honesty. That’s worse.'

They stop walking.

“You think I’m rushing people,” they say. “I think I’m sparing them delay. Uncertainty exhausts people. You’ve noticed that.”

“I’ve noticed what certainty does when it’s premature,” you reply.

They smile faintly. “That’s the difference between us. You protect process. I protect outcome.”

The line hangs between you.

Clean. Accurate. Dangerous.

“You’re creating friction,” they continue. “Eventually, people will choose speed over care. When they do, they won’t choose you.”

You meet their gaze now.

“Maybe,” you say. “But if they don’t notice the cost, that choice won’t be theirs.”

For the first time, something like irritation flickers across their face.

Just for a second.

“Be careful,” they say quietly. “You’re slowing a system that wants to move.”

“And you’re steering one that hasn’t consented,” you reply.

Silence.

Then they step back.

“This doesn’t end here,” they say. “It just becomes less polite.”

They turn and leave.

No threats.
 No victory.

Just lines drawn.

(Veil Lift — Sharp, Defining)
        Not all conflicts are about control.
         Some are about what you’re willing to risk for others.`,
      choices: [
        { id: "continue", label: "Continue", next: "act3_scene5" }
      ]
    },

    act3_scene5: {
      id: "act3_scene5",
      text: `
SCENE 5: THE INTERRUPTION

The confrontation doesn’t explode the way you half-expect it to.

That should have warned you.

A few days pass. Things don’t calm down — they hold. Like a system bracing for impact. Conversations feel rehearsed. Decisions pause mid-sentence more often than they finish.

People are aware now.

Not of what exactly — just that something unseen is influencing outcomes.

You’re in a discussion when it happens.

Not dramatic. Not loud.

Just… wrong.

Someone makes a point you’ve heard before — almost word for word — but they aren’t one of the usual accelerators. They look confused as they say it, like the thought arrived fully formed without asking permission.

The room stills.

You feel it immediately.

This isn’t escalation.

It’s interference.

Dry Internal Aside
'Oh good.
 Now there are three of us.'

The air shifts — subtly but unmistakably. The kind of shift that makes people glance around, unsure why they’re suddenly uncomfortable.

Someone else speaks.

Not aligned with you.
 Not aligned with the manipulator.

Different cadence. Different pressure.

“Stop,” they say.

Just that.

No authority in their tone — only certainty.
The conversation dies instantly.

Everyone feels it.

Even those with no language for it.

The speaker looks around the room, then at you — and then, deliberately, at the manipulator.
“You’re both pulling too hard. In opposite directions.”

The manipulator’s expression tightens. “You shouldn’t be involved.”

“That stopped being your call,” the newcomer replies calmly.

They turn back to the group.

“None of this is ready,” they continue. “And pretending otherwise is what caused this fracture in the first place.”

Fracture.

The word lands.

You feel the weight of it settle into place.

(Veil Lift — Structural, Unavoidable)
        When awareness spreads without alignment,
         systems don’t break —
         they split.

The newcomer meets your eyes last.

Not judgment.
 Not approval.

Assessment.

“You’ve been slowing things down,” they say. “That matters.”

Then, to the manipulator:
“And you’ve been making things efficient.”

A pause

“Efficiency isn’t evil,” they add. “But timing is everything.”

Silence.

No one argues.

Because no one can.

They leave as quietly as they arrived.

No explanations given.
 No sides chosen.
Just a truth introduced that reframes everything.`,
      choices: [
        { id: "complete_act3", label: "Acknowledge the moment", flags: ["act3_complete"], next: "act4_start" }
      ]
    }

  }
};