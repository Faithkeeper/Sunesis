// =======================
// ACT 2 — THE CONVERGENCE (FIXED)
// =======================

window.ACT2 = {
  id: "act2",
  start: "act2_scene1",
  scenes: {

    // SCENE 1 — FIRST CONTACT
    act2_scene1: {
      id: "act2_scene1",
      text: `
SCENE 1: FIRST CONTACT

The building doesn’t stand out.

If you weren’t looking for it, you’d pass by without a second glance. No signs. No crowds. Just a door, slightly ajar, light spilling out in a way that suggests intention rather than invitation.

You pause before entering.

Not because you’re afraid —
but because something about this moment feels decisive.

This is the point where curiosity becomes movement.

Before you step inside, you notice your own internal state.

How do you feel right now?`,
      choices: [
        { 
          id: "cautious", 
          label: "Curious, but cautious", 
          flags: ["cautious_frame"],
		  onChoose: () => { RegretSystem.sow('observation'); }, // <--- PLANT SEED
          postText: `You’re here to observe, not commit.`,
          next: "act2_scene1_pos" 
        },
        { 
          id: "compelled", 
          label: "Uneasy, yet compelled", 
          flags: ["compelled_frame"],
          postText: `Part of you wants to turn back. Another part won’t let you.`,
          next: "act2_scene1_pos" 
        },
        { 
          id: "analytical", 
          label: "Skeptical and analytical", 
          stats: { gnosis: 1 }, 
          postText: `You expect patterns, not promises.`,
          next: "act2_scene1_pos" 
        },
        { 
          id: "inevitable", 
          label: "Calm — as if this was inevitable", 
          flags: ["inevitable"], 
          postText: `Whatever led you here has already done its work.`,
          next: "act2_scene1_pos" 
        }
      ]
    },

    // SCENE 1 — POSITIONING
    act2_scene1_pos: {
      id: "act2_scene1_pos",
      text: `
You step inside.

The air in the room is cooler than the street, but it feels denser, as if the oxygen has been replaced by expectation. There are maybe twenty people here, gathered in loose clusters. Some are whispering; others are standing in a silence so heavy it feels like a choice.

You haven't been noticed yet. You have a few seconds to decide where you belong in this space.`,
      choices: [
        { 
          id: "sentinel", 
          label: "Stay near the entrance (The Sentinel)", 
          flags: ["sentinel"],
          postText: `You keep your back to the door. You’re the first to see new arrivals, but the conversation at the front reaches you like a muffled echo.`,
          next: "act2_scene1b" 
        },
        { 
          id: "participant", 
          label: "Drift toward the center cluster (The Participant)", 
          stats: { gnosis: 1 }, 
          flags: ["participant"], 
          postText: `
You move into the heat of the group. You can hear the individual breaths of the people around you. You are part of the "collective."

You overhear a snippet of a woman’s doubt: "...but what if it's just a collective hallucination?"`,
          next: "act2_scene1b" 
        },
        { 
          id: "outsider", 
          label: "Find a shadow on the perimeter (The Outsider)", 
          stats: { sunesis: 1 }, 
          flags: ["outsider"], 
          postText: `
You circle the edge of the room, keeping the wall at your side. You are looking at the group as a whole, rather than the individuals.

You notice that the "Speaker" isn't at the front of the room; he’s standing in the back, watching the crowd. You’ve noticed him before he notices you.`,
          next: "act2_scene1b" 
        }
      ]
    },
    
    act2_scene1b: {
      id: "act2_scene1b",
      text: `
The room is already occupied.

You scan the clusters, but your eyes keep drifting back to the man you saw earlier in the shadows. He's the only one not talking.

Not many people — but enough to register immediately that this isn’t random. No one looks surprised to see you. A few glance up, make brief eye contact, then return to their own conversations.

There’s no central figure. No one greeting arrivals.
 
Just clusters of people, all subtly different — in posture, in attentiveness, in awareness.

You realize something quickly:

Everyone here noticed something.

Not the same thing. Not in the same way.

But enough to bring them to the same place.

And for the first time since this began, the thought lands with weight:

This isn’t about what I felt back then.

It’s about what I do now.`,
      autoNext: "act2_scene2"
    },

    // SCENE 2 — ECHO
    act2_scene2: {
      id: "act2_scene2",
      text: `
SCENE 2: ECHO

The gathering ends without ceremony.

No closing remarks. No summary. People leave in small, uncoordinated groups, conversations tapering off as if nothing significant occurred.

You step back outside.

The air feels unchanged. Cooler, maybe. Or maybe you’re just paying attention again.
At first, nothing follows you.
That’s what makes it unsettling when it finally does.

Not a voice. Not a message.

A pattern.

Something about the way events line up on your way home feels… rehearsed. A pause at a crossing that lasts slightly too long. A familiar street momentarily unrecognizable. A thought resurfacing at the exact moment you try to ignore it.

Not intrusive. Persistent.

You realize then — the convergence didn’t end when you left.

It extended.`,
      enterActions: [
        {
          // If player was sentinel OR outsider -> WATCHED branch
          ifAny: ["sentinel", "outsider"],
          addFlags: ["echo_watch"],
          text: `[BRANCH: WATCHED]

You begin to notice how often you’re just in time.

A conversation you overhear answers a question you hadn’t voiced. A sign catches your attention precisely when you’re considering a different route. Nothing supernatural — just alignment too consistent to dismiss.

It feels like being included without being summoned.

Later, a veil lifts:
    Attention grants access without announcement.

You understand something new:
You don’t need to insert yourself to remain involved.
You’re already inside the current.`
        },
        {
          // If player was participant -> ASKED branch
          ifFlag: "participant",
          addFlags: ["echo_asked"],
          text: `[BRANCH: ASKED]

Your phone vibrates again.

Same unknown number.
    'You recognized it when it surfaced
     That’s why it responded.'

No greeting. No explanation.

The awareness sharpens — but so does responsibility.`
        },
        {
          // default branch (none of the above)
          default: true,
          addFlags: ["echo_dismissed"],
          text: `[BRANCH: DISMISSED]

Nothing unusual happens.
That's the problem.

The thoughts from earlier don’t return. The patterns dissolve back into noise. The evening passes with familiar distractions and comfortable routines.

You sense, dimly, that something moved on without you.
Not gone.
Just no longer close.`
        }
      ],
      choices: [
        { id: "continue", label: "Continue", next: "act2_scene3" }
      ]
    },

    // SCENE 3 — THE COST OF STILLNESS
    act2_scene3: {
      id: "act2_scene3",
      text: `
SCENE 3: THE COST OF STILLNESS

It doesn’t announce itself as a decision. That’s what makes it dangerous.

The moment arrives disguised as restraint — the same kind you’ve practiced since the gathering. Observe. Wait. Don’t interfere prematurely. Let things reveal themselves.

The man from earlier is there. Quieter than before. Less composed.

Someone else is speaking — confidently, convincingly — offering an explanation for what happened. It’s tidy. Reassuring. It gives everyone a way to file the disruption away without changing anything.

The Speaker has finished the formal address, and now the room has tightened into a single, ragged circle. The "Natural" world is starting to feel very far away. The silence is no longer peaceful; it’s a demand.

You need to adjust. The stillness is becoming a cage.`,
      choices: [
        { 
          id: "inner_ring", 
          label: "Step into the inner ring (Assume Authority)", 
          flags: ["assumed_authority"], 
          stats: { authority: 1 }, 
          postText: `You close the physical gap, making the circle smaller. You are now looking the Speaker directly in the eye.`,
          next: "act2_scene3b" 
        },
        { 
          id: "perimeter", 
          label: "Step back and maintain perimeter (Preserve Perspective)", 
          flags: ["cold_clarity"], 
          postText: `You put an extra foot of space between you and the others. You want to see the "Shadows" clearly.
            
You see the way the "Veil" is thickening around the group. You are less affected by the emotional pressure, but you feel "colder."`,
          next: "act2_scene3b" 
        },
        { 
          id: "investigator", 
          label: "Follow a stray thread (Investigate)", 
          flags: ["persistent_world_hint"], 
          postText: `You notice a man at the edge of the circle looking at his phone with a look of pure terror. You move toward him briefly to see what he’s seeing.

You see a text on his screen: “It’s happening at the other sites too.” 

[This is your first hint of the "Persistent Online World"]`,
          next: "act2_scene3b" 
        }
      ]
    },
    
    // SCENE 3B — THE CRITICAL CHOICE
    act2_scene3b: {
      id: "act2_scene3b",
      text: `
You see the flaw immediately.

Not because you’re smarter — but because you’re paying attention.

The explanation almost fits. Enough to satisfy most people. Enough to become consensus.

Almost.

You feel the familiar hesitation rise.

This isn’t my place. I don’t have the full picture. I could be wrong.

All reasonable. All safe. And all, for the first time, insufficient.

You sense it clearly now: if this interpretation takes root, something will be lost.

Not permanently. But needlessly.

The man catches your eye — just briefly. Not pleading. Not commanding. Aware.

The moment stretches.

No one is asking you to speak.

That’s the point.
Critical Choice — Authority Begins Here.`,
      choices: [
        {
          id: "speak_out",
          label: "Speak — even without certainty",
          flags: ["authority_spoken"],
          postText:`
You don’t argue. You don’t correct.

You simply point out what doesn’t align. A missing connection. A timing issue. A conclusion that arrived too early.
            
The room resists — gently at first. Someone counters. Another shrugs.
            
Then something shifts.
            
Not agreement — pause.
            
The explanation loses momentum. Certainty softens. Alternatives reopen.
            
The man exhales slowly.
            
Nothing resolves immediately. But damage is avoided.
            
You feel it settle — not as confidence, but as weight.`,
          next: "act2_scene4"
        },
        {
          id: "remain_silent",
          label: "Remain silent and let things settle",
          flags: ["authority_withheld"],
          postText: `
The explanation solidifies.
            
People nod. The tension drains. The gathering finds closure — the comfortable kind.
            
The man says nothing.
            
Later, when you’re alone, the awareness returns — sharper than before. Not accusing. Clear.
            
You see exactly where the divergence happened. Exactly how small it was. Exactly why it mattered.
            
And why it will cost more later.

A veil lifts, colder this time:
    'Restraint that avoids responsibility becomes neglect'
            
You understand something now that you didn’t before:
Discernment isn’t about knowing when not to act.
            
It’s about knowing when you must.`,
          next: "act2_scene4"
        }
      ]
    },

    // SCENE 4 — THE WORST POSSIBLE TIMING (Part 1)
    act2_scene4: {
      id: "act2_scene4",
      text: `
SCENE 4: THE WORST POSSIBLE TIMING

The conversation thins out naturally this time.

Not because people are finished — but because something unspoken has been acknowledged and doesn’t need repeating. A few attendees check their phones. Someone makes an excuse about an early morning that convinces no one, least of all themselves.

You’re considering leaving when someone steps into your path.

Not abruptly. Not dramatically.

Just… deliberately.

It’s the man from earlier.

Up close, he looks more tired than troubled — the kind of tired that comes from carrying context other people don’t have. He studies you for a moment, then exhales.

“I was hoping you wouldn’t disappear,” he says.

Fantastic, you think. I knew standing there attentively would come back to haunt me.

He doesn’t lower his voice, but he doesn’t raise it either. Whatever he’s about to say isn’t secret — it’s just not meant for everyone.

“There’s a window,” he continues. “It’s closing faster than I expected.”

You wait.`,
      choices: [
        { 
          id: "listen", 
          label: "Listen", 
          postText: `
He nods, as if confirming something internally. “You noticed when things didn’t line up. You didn’t rush. And when it mattered, you didn’t stay quiet.”

That last part lands heavier than the rest.

“I need you to hold something,” he says.

You blink. “Hold what?”

He almost smiles. Almost.

“Context,” he replies. “Until the others catch up.”`,
          next: "act2_scene4b" 
        }
      ]
    },

    // SCENE 4B — THE CHARGE
    act2_scene4b: {
      id: "act2_scene4b",
      text: `
Of course it’s context, you think. Not keys. Not money. Context.

You glance around instinctively. No one is paying obvious attention — which somehow makes this worse.

“Why me?” you ask.

He shrugs. “Because you’re here. And because you didn’t need to be told.”

There’s a pause — just long enough for refusal to be possible.

Then he adds, “Also, you’re less dramatic than the alternatives.”

He speaks more quietly now.

“Don’t lead. Don’t explain. And definitely don’t try to convince anyone.”

You nod, unsure why you’re agreeing.

“Just… notice. When alignment slips. When timing matters. When people are about to act on something they don’t understand yet.”

“That’s it,” he says. “That’s the responsibility.”

That’s it, you repeat internally. Just quietly carry reality while everyone else catches up. Easy.

[AUTHORITY ACCEPTED]

A final thought settles before you leave:
Authority isn’t assigned to the loudest. It’s entrusted to the attentive.`,
      enterActions: [
        {
          default: true,
          addFlags: ["context_bearer", "authority_bound"]
        }
      ],
      choices: [
        { 
          id: "end_act2", 
          label: "End Act 2", 
          next: "act3_scene1" 
        }
      ]
    }

  }
};
