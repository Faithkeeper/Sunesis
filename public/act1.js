// =======================
// ACT 1 — APOKALUPSIS (web port — aligned to Python IDs/flags + postText)
// =======================

window.ACT1 = {
  id: "act1",
  start: "act1_scene1",
  scenes: {

    // SCENE 1 — THE INVITATION
    act1_scene1: {
      id: "act1_scene1",
      text: `
You didn’t come here expecting anything to happen.

That’s the problem.

The room is too warm, chairs packed too close together, the air filled with the low murmur of people waiting for something they don’t quite believe will arrive. You’ve been in rooms like this before — places where words circulate but nothing changes.

You’re already planning your exit.

The speaker is talking, but your attention drifts. Not out of boredom — out of familiarity. Promises tend to sound the same when you’ve heard enough of them.

Then something interrupts the rhythm.

Not volume.
 Not emotion.

Precision.

“For a moment,” the voice says,
 “forget where you are.”

You don’t mean to listen.
 You do anyway.

“This isn’t about joining anything,” the speaker continues.
 “It isn’t about belief, history, or the story you tell yourself about who you are.”

A pause. Long enough to feel deliberate.

“This is about becoming aware.”

The word lands strangely — not in your thoughts, but behind them.

It’s subtle. A pressure. Like realizing you’ve been holding tension you never consciously chose.

You have the unsettling sense that something is waiting for your response.

Not the speaker.

Something else.

How do you respond? (You are not choosing who you are — only where you look.)`,
      choices: [
        {
          id: "focus",
          label: "Focus on the sensation",
          stats: { sunesis: 1 },
          flags: ["veil_seeded"],
          // STEP 1: THE ECHO (Immediate Acknowledgment)
          postText: `The edges of the room blur. The speaker’s voice stops being words and starts being a physical vibration in your chest.
          
<span class="system-echo">That choice didn’t disappear.</span>`,
          next: "act1_scene1b"
        },
        {
          id: "analyze",
          label: "Analyze the logic of the words",
          stats: { gnosis: 1 },
          postText: `You ignore the 'feeling' and dissect the sentence structure. You aren't falling for the mood; you are mapping the blueprint.
          
<span class="system-echo">That choice didn’t disappear.</span>`,
          next: "act1_scene1b"
        },
        {
          id: "guard",
          label: "Guard your mind",
          stats: { skepticism: 1 },
          postText: `You deliberately notice the hum of the air conditioner. You anchor yourself in what’s tangible.
          
<span class="system-echo">That choice didn’t disappear.</span>`,
          next: "act1_scene1b"
        }
      ]
    },

    act1_scene1b: {
      id: "act1_scene1b",
      text: `
The speaker continues, but something has already shifted.

“As strange as it may sound,” the voice says,
“some of you already sense there’s more to you than what you’ve been living.”

Your breathing slows without permission.

“No one is asking you to prove anything,” the speaker adds.
“No one is forcing you forward.”

Another pause — heavier this time.

“But if something in you is responding right now…”

The pressure intensifies, just slightly.

“…don’t ignore it.”

You realize something that unsettles you more than the words themselves:

If you walk away from this moment, it will follow you anyway.

“This moment,” the speaker concludes,
“is a threshold.”

The word stays with you.

Not like a metaphor.
Like a warning.

How do you respond?`,
      choices: [
        {
          id: "remain",
          label: "Remain where you are",
          flags: ["coord_observer"],
          postText: `[The room empties around you. You become a 'still point.']

You tell yourself this will pass.

The Speaker makes eye contact with you specifically. A silent acknowledgement that you are holding the space.`,
          next: "act1_scene2"
        },
        {
          id: "stand",
          label: "Stand — even without understanding why",
          flags: ["coord_disruptor"],
          postText: `You don’t understand the impulse. You obey it anyway.

You feel the eyes of everyone nearby. By standing, you’ve signaled that the 'Veil' has lifted.

The Speaker’s voice takes on a sharper, more direct edge when he looks your way.`,
          next: "act1_scene2"
        },
        {
          id: "observe",
          label: "Observe carefully",
          flags: ["coord_ghost"],
          stats: { sunesis: 2 },
          postText: `You watch the room. The speaker. The people reacting — and the ones who aren’t.
		  
You are the only one noticing the reactions of the crowd rather than the speaker.

You notice a person in the back row watching the crowd just like you are. You’ve found a peer.`,
          next: "act1_scene2"
        },
        {
          id: "leave_early",
          label: "Leave early",
          flags: ["coord_skeptic"],
          stats: { skepticism: 2 },
          postText: `[You step out into the cold air while the 'spell' is still active inside.]

You decide you’ll deal with this on your own terms.

The sudden silence of the street feels like a physical blow. You’ve maintained your independence.`,
          next: "act1_scene2"
        }
      ]
    },

    // SCENE 2 — INTERNAL DIALOGUE
    act1_scene2: {
      id: "act1_scene2",
      text: `
Nothing dramatic happens.

No sound.
No light.
No reaction from the room.

And yet—

Something has shifted.

You are back in the vehicle, but the hum of the engine feels like it’s vibrating at the same frequency as your own thoughts. Outside, the city is a blur of gray. Inside, the air is thick with a silence that feels like a demand.

[MICRO-INTERACTION] The vehicle lurches over a rough patch of road, and the screen in your hand tilts.`,
	choices: [
			{ 
				id: "focus", 
				label: "Steady the device and focus", 
				postText:`The text is sharp, cutting through the blur of the moving vehicle. You are in control of the intake.`,
				next: "act1_scene2b" },
			{ 
				id: "acknowledge", 
				label: "Wait for the vibration to settle", 
				postText:`The world outside wins for a moment. You wait for the road to smooth out, letting the environment dictate when you are ready to listen.`,
				next: "act1_scene2b" }
		  ]
		},

	
	act1_scene2b: {
      id: "act1_scene2b",
      text: `
Once you steady your gaze, the words from the speaker return. Not as a memory, but as a presence.

“Becoming aware.”
“A threshold.”

You’ve always assumed change required force.
Discipline. Struggle. Time.

But something about this moment suggests a different possibility—that something fundamental is already in place, currently unnoticed.

You feel a subtle resistance rise. Not fear—familiarity. The instinct to return to the predictable. 

[SYSTEM ALERT] SYSTEM AWAITING COHERENCE.

You realize with a jolt that you aren't just thinking about the story anymore. You are becoming a part of its data stream. The phone in your hand feels heavier than it did a minute ago.`,
      veil: {
        id: "veil_1",
        revealedText: `
That assumption was never questioned before.
Not because it was true —
but because it was familiar.`
      },
      autoNext: "act1_scene3"
    },

    // SCENE 3 — IN TRANSIT
    act1_scene3: {
      id: "act1_scene3",
      text: `
The vehicle is already crowded when you step inside.

Conversations overlap in fragments — unfinished jokes, complaints, voices raised just enough to be heard without inviting response. You find a place to stand, one hand gripping a rail that’s been polished smooth by years of strangers doing the same.

Everything feels… ordinary.
Too ordinary.

And yet, something doesn’t sit right.
Not wrong.
 Not alarming.

Just slightly misaligned.

You try to pin it down. Was it something the speaker said? A mood? Fatigue? You’ve had days like this before — moments where your thoughts refused to settle.

This feels different.

Your attention keeps returning to the same point, like a tongue pressing against a loose tooth.

Why did that moment stay with me?

You didn’t agree to anything.
You didn’t decide anything.
Nothing was demanded of you.

So why does it feel as though something is already underway?

The vehicle slows. Someone steps off. Another takes their place. Life continues its quiet, relentless motion — indifferent to whatever just happened inside you.

You tell yourself that’s the answer.

If nothing around you has changed, then nothing has changed.

And yet, the thought doesn’t convince you.

No emphasis.
 No signal.

Just truth, waiting.

The vehicle slows. The air inside the cabin feels thinner now—not lacking oxygen, but lacking clutter. A passenger gets off, and for a second, the door stays open too long. You feel a sudden, irrational urge to move.`,
      microVeil: {
        condition: "always",
        revealedText: `
You’ve used the same reasoning before — and it never held.`
      },
	  // STEP 2: MICRO FEEDBACK LOOP (Conditional Phrasing)
      conditionalText: [
        {
          if: { stat: "gnosis", gte: 1 }, // Logic
          text: `The vehicle moves with calculated precision. Every stop feels routed. The machinery of the city feels exposed.`
        },
        {
          if: { stat: "sunesis", gte: 1 }, // Loyalty/Connection
          text: `You feel the collective weight of the passengers. A shared, silent momentum that pulls everyone in the same direction.`
        },
        {
          if: { stat: "skepticism", gte: 1 }, // Chaos/Defense
          text: `The brakes grind abruptly. The ride feels disjointed. The pattern is stuttering.`
        }
      ],
      choices: [
        {
          id: "change_vehicle",
          label: "Change vehicles",
          stats: { sunesis: 1 },
          flags: ["curiosity"],
		  postText: `You step off the vehicle before the doors hiss shut. The curb feels unexpectedly solid beneath your feet. As the vehicle pulls away, you find yourself alone on a street that looks hyper-real, as if the saturation has been turned up. In the distance, a flicker of light catches your eye—a "glimmer" that shouldn't be there.

Another vehicle stops by, you enter and then continue your journey...`,
          next: "act1_scene4"
        },
        {
          id: "assert_space",
          label: "Assert space",
          stats: { gnosis: 1 },
          flags: ["isolation"],
		  postText: `
		  You retreat to the back corner, claiming the small shadow near the window. By choosing this boundary, the noise of the other passengers begins to recede into a dull, unimportant hum. In this sanctuary, you find your thoughts sharpening, the logic of the day finally beginning to form a coherent map.`,
          next: "act1_scene4"
        },
        {
          id: "follow",
          label: "Follow the passenger",
          flags: ["found_lore"],
          postText: `[You step out into the crowd, keeping your eyes on the passenger who just left. Their shadow seems to move with a strange, heavy fluidity. You lose them in the press of people, but as you stop to catch your breath on a nearby bench, you see it—a discarded pamphlet. On the cover is the exact same symbol from your book.]

[ITEM OBTAINED: Marked Pamphlet]`,
          next: "act1_scene4"
        }
      ]
    },

    // SCENE 4 — UNINTENDED QUESTION
    act1_scene4: {
      id: "act1_scene4",
      text: `
The vehicle hisses to a halt. You step onto the pavement, the sudden stability of the ground feeling strange after the long, rattling journey. You stand before the address from the pamphlet—a building that looks aggressively ordinary.

You’re not trying to listen, but as you wait by the heavy wooden doors, the conversation of two people leaning against the brickwork intrudes. “I’m telling you,” one says, “it’s always like this. You try, nothing changes”. So eventually you just stop expecting anything.”

The other hums in agreement. “Yeah. You do what you can, but it is what it is.”

The words should pass through you.

They don’t.

They settle.

You’ve said variations of that sentence before. Maybe not out loud, but often enough to recognize the shape of it. It’s the kind of conclusion that feels earned — practical, even protective.

The vehicle rattles over a rough patch of road. For a moment, the voices fade beneath the noise.

And a thought surfaces.
Is that actually true… or just familiar?

You don’t react immediately. The question doesn’t demand attention. It doesn’t accuse you of anything.`,
      choices: [
        {
          id: "question",
          label: "Question that thought",
          flags: ["questioned"],
		  postText:`You stop, your hand hovering over the door handle. You don't just hear the words; you weigh them. Why am I here? Am I just another person trying to 'wake up' to a dream? The skepticism feels like a cold weight in your chest, but it sharpens your focus as you finally push the door open and enter the hall.

You replay the sentence in your mind — not the words, but the certainty behind them.

“It is what it is.”

You’ve accepted that idea in places you no longer remember choosing to accept it. Not because it was proven — but because it ended the discomfort of hoping for something more.

That realization lands quietly.

You’re not disturbed.

You’re alert.`,
          next: "act1_scene4b"
        },
        {
          id: "dismiss",
          label: "Let it pass without engaging",
		  postText:`You ignore the cynicism and push past them. Their bitterness is their own; you are here for the gathering, not the commentary outside it. As the heavy doors swing shut behind you, the muffled sounds of the city vanish, replaced by the rows of tightly packed chairs and the expectant energy of the room.
            
The conversation drifts away, replaced by others just like it.
            
The thought dissolves.
            
Not because it was answered — but because you decided not to follow it.
            
You’re not disturbed.
            
You’re alert.`,
          next: "act1_scene4b"
        }
      ]
    },

    act1_scene4b: {
      id: "act1_scene4b",
      text: `
The speaker is talking, but the "subtle pressure" is now a physical weight. People around you are reacting—some leaning in, some crossing their arms. You aren't just a brain in a chair; you are a body in a room of shifting energy.

How do you position yourself?`,
      choices: [
        {
          id: "intervene",
          label: "Move closer to the front",
          flags: ["noticed_early"],
		  postText:`You don't just speak; you step forward, breaking the rhythm of the two people at the door. They stop mid-sentence, startled by your presence. One of them looks at you with a mix of annoyance and sudden curiosity.

"Maybe," the taller one mutters, "but some of us have been awake long enough to be tired of it."

They move aside, clearing a path for you. You enter the room not as a guest, but as a participant who has already begun to shift the air.

The hum of the room hits you like a physical wall as you move toward the front. You don't just find a seat; you claim one. The speaker’s eyes track your movement, and the air between you feels tight, like a wire pulled to its limit. You aren't just listening anymore; you are a part of the pressure.`,
          next: "act1_scene5"
        },
        {
          id: "observe_crowd",
          label: "Lean against the back wall",
          flags: ["world_awareness"],
		  postText:`You retreat to the back corner, claiming the small shadow near the window. By choosing this boundary, the noise of the other passengers begins to recede into a dull, unimportant hum. In this sanctuary, you find your thoughts sharpening, the logic of the day finally beginning to form a coherent map.
 
You settle against the back wall, the cool brick solid against your shoulders. From here, the room looks like a map. You see the way people lean in, the way they pull away, and the three figures who remain perfectly still—like stones in a stream. You are invisible, but you see everything.`,
          next: "act1_scene5"
        },
        {
          id: "test_exit",
          label: "Walk toward the exit",
          flags: ["door_warm"],
		  postText:`You stay by the door, your hand never fully letting go of the heavy brass handle. You aren't fully in, and you aren't fully out. You watch the two people talk, but your eyes keep darting back to the street behind you.

The speakers notice your hesitation. They lower their voices, treating you like a stranger who might bolt at any second. You enter the hall finally, but you choose the very last row, keeping the door in your peripheral vision at all times.

You stand with your back to the door, the handle still warm in your mind. You chose to stay, but you haven't committed. The room feels temporary, like a stage set you could walk away from at any second. But as the speaker begins again, you realize the "tug" didn't stay outside—it's already inside you.

You reach the door, but the handle feels warm—almost like it's alive. You realize the \"gathering\" isn't the room; it's the connection. You step back in, now certain it's real.`,
          next: "act1_scene5"
        }
      ]
    },

    // SCENE 5 — ALIGNMENT
    act1_scene5: {
      id: "act1_scene5",
      text: `
You don’t feel different in any obvious way. Your posture hasn’t changed. Your breathing hasn’t deepened. Nothing dramatic announces itself.

And yet—

Your thoughts no longer pull in opposite directions.

The unease you noticed earlier hasn’t vanished, but it’s no longer scattered. It has a shape now — like a problem finally understood well enough to be approached.

You realize something with mild surprise:

The moment from earlier no longer feels isolated.

It connects.
The speaker’s words.
The thought that surfaced uninvited.
The sentence you questioned instead of dismissing.

They don’t contradict one another.

They align.

That alone tells you more than certainty ever could.

You’ve lived with contradictions for so long that coherence feels unfamiliar — almost suspicious. But this isn’t confusion resolving into comfort.

It’s clarity replacing noise.

For the first time since this began, you’re not trying to explain the experience away.

You don’t need to.

Nothing new has been added.

Something unnecessary has been removed.`,
      conditionalText: [
        {
          if: { stat: "sunesis", gte: 2 },
          text: `
You notice that the people stepping off aren’t just people.
Their shadows linger a second too long.`
        },
        {
          if: { stat: "skepticism", gte: 1 },
          text: `
You feel only the cold draft from the open door.`
        }
      ],
      autoNext: "act1_transition"
    },

    // ACT 1 → ACT 2 TRANSITION
    act1_transition: {
      id: "act1_transition",
      text: `
You are in the vehicle again, this time returning. The experience in the building is still fresh in your mind.

The vehicle slows.

This time, you don’t look up immediately.

Your phone vibrates.
Once.

You almost ignore it. Habit. Nothing urgent ever arrives unannounced. When you finally glance down, the number means nothing to you — no name, no history.
Just a message:

        'If the moment earlier meant nothing to you, ignore this.'
        'If it didn’t — you’re not the only one.

<span class="feed-preview">Someone noticed something.</span>`,
      choices: [
        {
          id: "noticed",
          label: "I was noticed.",
          flags: ["kainos_path", "Path_Noticed"],
		  // STEP 4: FIRST PROOF OF CONSEQUENCE
          postText: `
<div class="system-boot">PREVIOUS DECISIONS DETECTED.</div>

The hum of the vehicle’s engine vibrates through your seat, a constant, low-frequency reminder that you are in motion. Outside the window, the world is a streak of gray, but inside the cabin, the air has suddenly gone still.

You don't just feel the phone call anymore; you feel the weight of the connection. By acknowledging it, you’ve pulled on a thread that is attached to something much larger than this car.

(New System Text): CONNECTION STABILIZED.

You aren't just a passenger anymore. You’ve just signaled to the system that you are awake.

The system pauses. The static clears for a moment.
    
    [SYSTEM QUERY]
    Identity verification required before proceeding.`,
		input: {
		type: "text",
		key: "name", // This saves to Engine.player.name
		placeholder: "Enter designation...",
		buttonLabel: "Confirm Identity"
	  },
          // triggers: ["late_name_ready"], // now handled by app logic
          next: "act2_start"
        },
        {
          id: "coincidence",
          label: "This is a coincidence.",
          flags: ["offline_resistance"],
		  onChoose: () => { RegretSystem.sow('disconnect'); }, // <--- PLANT SEED
		  postText:`
<div class="system-boot">PREVIOUS DECISIONS DETECTED.</div>		  

The message doesn’t explain itself. Not yet. You feel it recede — not gone, just waiting.

The phone call remains a jagged edge in your memory, but you choose to file it under 'statistical anomaly.' The system doesn't argue. It simply waits.

The logic of the world reasserts itself, cold and comforting. You tell yourself that a phone call is just audio data, and a name is just a string of characters.

(New System Text): COINCIDENCE LOGGED.

But as you return to the data on your screen, the silence in the vehicle feels different. The phone—now dark and dormant—looks like a predator that decided you weren't worth the hunt. For now.

You didn't answer the call. You didn't claim the name. You chose to be a ghost in your own life.`,
          next: "act2_start"
        }
      ]
    }

  }
};
