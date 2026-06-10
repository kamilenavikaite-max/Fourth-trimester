import { useState } from 'react'

const MOODS = [
  { score: 1, emoji: '😔', label: 'Low' },
  { score: 2, emoji: '😟', label: 'Rough' },
  { score: 3, emoji: '😐', label: 'Okay' },
  { score: 4, emoji: '🙂', label: 'Good' },
  { score: 5, emoji: '😊', label: 'Great' },
]

const EXERCISES = [
  { title: '4-7-8 Breathing', type: 'Breathing', emoji: '🌬️', duration: '3 min', desc: 'Inhale for 4 counts, hold for 7, exhale for 8. This activates your body\'s natural calming response.', steps: ['Breathe in for 4 counts', 'Hold for 7 counts', 'Breathe out for 8 counts', 'Repeat 4 times'] },
  { title: 'Grounding 5-4-3-2-1', type: 'CBT', emoji: '🌱', duration: '4 min', desc: 'Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.', steps: ['5 things you can see', '4 things you can touch', '3 things you can hear', '2 things you can smell', '1 thing you can taste'] },
  { title: 'Loving-Kindness', type: 'Mindfulness', emoji: '💗', duration: '5 min', desc: 'Silently repeat warm phrases to yourself and your baby. You deserve compassion too.', steps: ['Close your eyes and breathe', 'Say: "May I be well"', 'Say: "May I be at peace"', 'Send this love to your baby'] },
  { title: 'Box Breathing', type: 'Breathing', emoji: '🟦', duration: '3 min', desc: 'Breathe in a square pattern to calm your nervous system quickly. Used by paramedics and athletes.', steps: ['Breathe in for 4 counts', 'Hold for 4 counts', 'Breathe out for 4 counts', 'Hold for 4 counts', 'Repeat 4 times'] },
  { title: 'Body Scan', type: 'Mindfulness', emoji: '🧘', duration: '5 min', desc: 'Slowly move your attention through each part of your body without judgement. Release tension as you go.', steps: ['Lie or sit comfortably', 'Start at your feet — notice any sensations', 'Slowly move attention up your legs', 'Continue up through your belly, chest, arms', 'End at the top of your head, take a breath'] },
  { title: 'Cold Water Reset', type: 'Grounding', emoji: '💧', duration: '2 min', desc: 'Splashing cold water on your face activates the diving reflex and slows your heart rate within seconds.', steps: ['Go to the sink', 'Fill your palms with cold water', 'Splash it on your face 3 times', 'Pat dry and take one slow breath', 'Notice how you feel now'] },
  { title: 'Shoulder Release', type: 'Movement', emoji: '🤸', duration: '3 min', desc: 'New moms carry tension in their shoulders from feeding and carrying. This melts it away.', steps: ['Roll shoulders slowly backward 5 times', 'Roll them forward 5 times', 'Bring both shoulders up to your ears, hold 3 seconds', 'Drop them with a big exhale', 'Repeat 3 times'] },
  { title: 'Self-Compassion Pause', type: 'Self-compassion', emoji: '🌸', duration: '3 min', desc: 'Three steps that help you treat yourself with the same kindness you\'d give a good friend.', steps: ['Place your hand on your heart', 'Say: "This is a hard moment"', 'Say: "All new moms struggle sometimes"', 'Say: "May I be kind to myself right now"', 'Stay here for 3 breaths'] },
  { title: 'Legs Up the Wall', type: 'Movement', emoji: '🦵', duration: '5 min', desc: 'A gentle inversion that drains fluid from tired legs, calms the nervous system, and needs zero effort.', steps: ['Sit sideways against a wall', 'Swing legs up so they rest on the wall', 'Let your arms fall open at your sides', 'Close your eyes and breathe naturally', 'Stay for 5 minutes'] },
  { title: 'Thought Defusion', type: 'CBT', emoji: '🧠', duration: '4 min', desc: 'Create distance from anxious thoughts by imagining them as objects passing by, not facts about reality.', steps: ['Notice an anxious thought you\'re having', 'Imagine placing it on a leaf floating down a stream', 'Watch it drift away slowly', 'If a new thought appears, place it on another leaf', 'You are the observer, not the thought'] },
  { title: 'Humming Breath', type: 'Breathing', emoji: '🎵', duration: '3 min', desc: 'Humming stimulates the vagus nerve directly, triggering deep calm within a few breaths.', steps: ['Breathe in through your nose', 'As you exhale, hum softly with mouth closed', 'Feel the vibration in your chest and throat', 'Lengthen the hum as long as feels natural', 'Repeat 8 times'] },
  { title: 'Gratitude Scan', type: 'Mindfulness', emoji: '✨', duration: '3 min', desc: 'A short scan for three specific, small things — not big abstract ones. Specificity is what makes gratitude work.', steps: ['Think of one tiny good thing from this morning', 'Think of one thing about your body that worked today', 'Think of one thing your baby did that made you feel something', 'Hold each for one breath', 'Let them sit in your chest'] },
  { title: 'Progressive Muscle Relaxation', type: 'Grounding', emoji: '💪', duration: '6 min', desc: 'Tense and release each muscle group. The contrast teaches your body what relaxed actually feels like.', steps: ['Tense your feet for 5 seconds, then release', 'Tense your calves for 5 seconds, then release', 'Tense your thighs and belly for 5 seconds, release', 'Tense your hands and arms for 5 seconds, release', 'Tense your face and shoulders, then let everything go'] },
  { title: 'Window Gazing', type: 'Mindfulness', emoji: '🪟', duration: '3 min', desc: 'Soft, unfocused gaze activates your parasympathetic nervous system and costs nothing.', steps: ['Find a window', 'Let your gaze go soft — not focusing on anything', 'Notice light, movement, color without labelling them', 'Let your jaw and forehead relax', 'Breathe slowly for 3 minutes'] },
  { title: 'Anchor Breathing', type: 'Breathing', emoji: '⚓', duration: '3 min', desc: 'Use a physical anchor — your feet on the floor — to stay present when feelings feel overwhelming.', steps: ['Press both feet flat on the floor', 'Feel the weight and pressure in your soles', 'Breathe in for 4 counts', 'Breathe out for 6 counts', 'Keep attention on your feet throughout'] },
  { title: 'Wrist Pulse Check', type: 'Grounding', emoji: '💓', duration: '2 min', desc: 'Finding your own pulse is an instant grounding tool — it reminds you that your body is here, working, alive.', steps: ['Press two fingers to the inside of your wrist', 'Find your pulse', 'Count 10 beats slowly', 'Notice your breath naturally slowing', 'Say: "I am here. I am okay"'] },
  { title: 'Kind Letter to Yourself', type: 'Self-compassion', emoji: '✉️', duration: '5 min', desc: 'Write three sentences to yourself as if you were a dear friend who knew everything you\'re going through.', steps: ['Open your journal or a notes app', 'Start with: "You are doing something incredibly hard"', 'Write one thing you\'ve done well this week', 'Write one thing you wish for yourself', 'Read it back slowly'] },
  { title: 'Neck Tension Release', type: 'Movement', emoji: '🌀', duration: '3 min', desc: 'Night feeds and phone-checking create neck tension. This melts it in minutes.', steps: ['Sit tall and drop your right ear to your right shoulder', 'Hold for 30 seconds and breathe', 'Slowly roll your chin to your chest', 'Drop your left ear to your left shoulder, hold 30 seconds', 'Slowly roll your head back to centre'] },
  { title: 'Square Breathing with Colour', type: 'Breathing', emoji: '🎨', duration: '3 min', desc: 'Adding a colour visualisation to box breathing deepens the calming effect.', steps: ['Choose a calming colour — blue, green, or pink', 'Breathe in for 4 counts — imagine breathing in that colour', 'Hold for 4 — see it filling your body', 'Breathe out for 4 — imagine grey tension leaving', 'Repeat 5 times'] },
  { title: 'One-Minute Compassion', type: 'Self-compassion', emoji: '🤍', duration: '1 min', desc: 'A single minute of directed self-compassion is enough to shift your emotional state.', steps: ['Set a 60-second timer', 'Place both hands on your heart', 'Repeat: "I am enough. I am doing my best"', 'Keep breathing slowly until the timer ends', 'That\'s it. You did it'] },
  { title: 'Nature Sound Focus', type: 'Mindfulness', emoji: '🌿', duration: '4 min', desc: 'Listening to natural sounds — even recorded ones — lowers cortisol and heart rate within minutes.', steps: ['Put on rain, ocean, or forest sounds (YouTube or Spotify)', 'Close your eyes', 'Pick one sound layer and follow it', 'When your mind wanders, return to the sound', 'Breathe slowly for 4 minutes'] },
  { title: 'Jaw and Face Release', type: 'Movement', emoji: '😮', duration: '2 min', desc: 'We hold enormous tension in our jaw and face without knowing. Releasing it creates whole-body calm.', steps: ['Open your mouth as wide as you can, hold 3 seconds', 'Release and let your jaw hang loose', 'Stick your tongue out fully, hold 3 seconds, release', 'Scrunch your whole face tight, hold 3 seconds', 'Release completely and breathe'] },
  { title: 'Three Good Things', type: 'CBT', emoji: '🌟', duration: '3 min', desc: 'A research-backed CBT exercise that gradually retrains the brain away from negativity bias.', steps: ['Think of one good thing that happened today — any size', 'Think of why it happened', 'Think of a second good thing', 'Think of a third', 'Write them down if you can — it doubles the effect'] },
  { title: 'Hand Massage', type: 'Grounding', emoji: '🤲', duration: '3 min', desc: 'Your hands do so much. Massaging them brings you into your body and activates calming pressure points.', steps: ['Press your right thumb into the palm of your left hand', 'Make slow circles for 30 seconds', 'Squeeze each finger from base to tip', 'Swap hands', 'End by pressing both palms together firmly'] },
  { title: 'Mindful Tea or Water', type: 'Mindfulness', emoji: '🍵', duration: '4 min', desc: 'Turning one drink into a mindful ritual creates a reliable calm anchor in your day.', steps: ['Make or pour your drink', 'Hold the cup with both hands — feel the warmth', 'Smell it before drinking', 'Take your first sip very slowly', 'Stay off your phone for the whole drink'] },
  { title: 'Belly Breathing', type: 'Breathing', emoji: '🫁', duration: '3 min', desc: 'Breathing into the belly instead of the chest signals safety to the nervous system.', steps: ['Place one hand on your chest, one on your belly', 'Breathe so that only the belly hand rises', 'In for 4 counts, out for 6', 'The chest hand should stay mostly still', 'Repeat for 10 breaths'] },
  { title: 'Worry Time', type: 'CBT', emoji: '📋', duration: '5 min', desc: 'Contain your worries to a defined window so they don\'t flood your whole day.', steps: ['Write down every worry you have right now', 'For each one, ask: "Can I do anything about this today?"', 'If yes — write one small action', 'If no — write: "I am releasing this for now"', 'Close the list. Worry time is over'] },
  { title: 'Sun Salutation (gentle)', type: 'Movement', emoji: '☀️', duration: '5 min', desc: 'A shortened, postpartum-safe version of the classic yoga flow. Move only as far as is comfortable.', steps: ['Stand tall, arms by sides, breathe in', 'Raise arms overhead as you inhale', 'Fold gently forward, bend knees as needed', 'Step back to a comfortable plank or table top', 'Lower, rest, then slowly rise back up'] },
  { title: 'Counting Backwards', type: 'Grounding', emoji: '🔢', duration: '2 min', desc: 'Counting backwards from 100 by 7s occupies the anxious part of the brain and interrupts panic.', steps: ['Start at 100', 'Subtract 7: 93', 'Keep going: 86, 79, 72...', 'If you lose track, just start again from 100', 'Do this for 2 minutes'] },
  { title: 'Affirmation Breathing', type: 'Self-compassion', emoji: '💬', duration: '3 min', desc: 'Pair a short affirmation with your breath so it becomes physical, not just mental.', steps: ['Choose one phrase: "I am strong" or "I am enough"', 'Breathe in — silently say the first word', 'Breathe out — silently say the second word', 'Repeat with each breath for 3 minutes', 'Notice if anything shifts in your chest'] },
  { title: 'Texture Grounding', type: 'Grounding', emoji: '🪨', duration: '2 min', desc: 'Running your fingers over different textures interrupts anxiety spirals by pulling you into the present.', steps: ['Pick up 3 objects near you', 'Run your fingers slowly over the first — describe the texture in your head', 'Move to the second — notice every ridge and edge', 'Move to the third', 'Take one deep breath. You are here'] },
  { title: 'Mindful Stretch', type: 'Movement', emoji: '🙆', duration: '4 min', desc: 'A slow, intentional stretch paying attention to sensation rather than performance.', steps: ['Reach both arms overhead and lean gently left', 'Hold for 5 breaths, notice the stretch', 'Come to centre, lean right, hold 5 breaths', 'Bring arms down, interlace hands behind back', 'Gently lift them and open your chest for 5 breaths'] },
  { title: 'Safe Place Visualisation', type: 'CBT', emoji: '🏡', duration: '5 min', desc: 'Create a mental safe place you can visit any time you feel overwhelmed.', steps: ['Close your eyes and breathe', 'Imagine a place where you feel completely safe — real or imagined', 'Notice what you see there', 'Notice what you hear and feel', 'Stay for 5 minutes, return whenever you need'] },
  { title: 'Sigh of Relief', type: 'Breathing', emoji: '😮‍💨', duration: '2 min', desc: 'A physiological sigh — double inhale followed by long exhale — is the fastest way to reduce stress.', steps: ['Take a normal breath in through your nose', 'Without exhaling, sniff in a little more air', 'Now exhale slowly through your mouth — as long as you can', 'Feel your shoulders drop', 'Repeat 5 times'] },
  { title: 'Compassion for Hard Moments', type: 'Self-compassion', emoji: '🕯️', duration: '4 min', desc: 'A practice for the specific moments that feel too hard — turning toward difficulty instead of away.', steps: ['Think of one thing that\'s been hard this week', 'Say: "This is really hard. I am not alone in this"', 'Place your hand on your heart', 'Ask: "What do I need most right now?"', 'Whatever comes up — offer it to yourself with kindness'] },
  { title: 'Walking Meditation', type: 'Mindfulness', emoji: '🚶', duration: '5 min', desc: 'Turn any walk — even just to the kitchen — into a meditation by slowing down and noticing each step.', steps: ['Walk slower than usual', 'Notice the feeling of your heel touching the floor', 'Notice the roll through your foot to your toe', 'Feel the slight sway in your body', 'Do this for 5 minutes — no destination needed'] },
  { title: 'Alternate Nostril Breathing', type: 'Breathing', emoji: '👃', duration: '4 min', desc: 'A yogic breathing technique that balances the nervous system and brings a sense of steadiness.', steps: ['Close your right nostril with your right thumb', 'Inhale slowly through the left nostril', 'Close left nostril with ring finger, release right', 'Exhale through the right nostril', 'Inhale right, then switch and exhale left — repeat 6 times'] },
  { title: 'Joy Memories', type: 'CBT', emoji: '📸', duration: '4 min', desc: 'Deliberately recalling positive memories counteracts the negativity bias that anxiety amplifies.', steps: ['Close your eyes', 'Think of a moment when you felt genuinely happy — before or after baby', 'Bring back as much detail as you can — sounds, light, who was there', 'Stay in that memory for 2 minutes', 'Take a breath and carry one detail with you'] },
  { title: 'Hip Opener', type: 'Movement', emoji: '🦋', duration: '4 min', desc: 'The hips store emotional tension. Gentle opening can release feelings you didn\'t know you were holding.', steps: ['Sit on the floor with soles of feet together', 'Let your knees fall open — don\'t force them down', 'Place hands on your feet or ankles', 'Breathe into your hips for 4 minutes', 'If emotion comes up, that is normal — breathe through it'] },
  { title: 'Mindful Shower', type: 'Mindfulness', emoji: '🚿', duration: '4 min', desc: 'Turn your next shower into 4 minutes of sensory grounding — the easiest mindfulness practice there is.', steps: ['Step in and stand still for a moment', 'Feel the water temperature on your skin', 'Listen to the sound of the water', 'Notice the scent of your soap', 'Let thoughts come and go like the steam'] },
  { title: 'Inner Child Comfort', type: 'Self-compassion', emoji: '🧸', duration: '4 min', desc: 'Connect with the younger part of you that also needed care — and give her what she needed.', steps: ['Close your eyes', 'Picture yourself as a child — any age that comes', 'Notice if she looks tired, scared, or overwhelmed', 'Imagine sitting beside her', 'Say: "I see you. You are safe. You are loved"'] },
  { title: 'Tension Breath', type: 'Breathing', emoji: '🌊', duration: '3 min', desc: 'Breathe into the exact spot where you feel tension — most people feel it in their chest or stomach.', steps: ['Find where tension lives in your body right now', 'Breathe in and direct the breath to that exact spot', 'Imagine it softening slightly on each inhale', 'Breathe out slowly — imagine tension leaving with the breath', 'Do this for 10 breaths'] },
  { title: 'Smile Meditation', type: 'Mindfulness', emoji: '😊', duration: '3 min', desc: 'A half-smile — even a forced one — activates facial muscles that signal positive emotion to the brain.', steps: ['Sit quietly and close your eyes', 'Let the corners of your mouth turn up very slightly', 'Hold the micro-smile — it does not need to feel real', 'Breathe slowly', 'Notice if anything shifts after 3 minutes'] },
  { title: 'Cognitive Reframe', type: 'CBT', emoji: '🔄', duration: '4 min', desc: 'Challenge one negative thought by examining the evidence for and against it.', steps: ['Write down one negative thought you\'re having', 'Ask: "What evidence supports this thought?"', 'Ask: "What evidence argues against it?"', 'Ask: "What would I tell a friend who thought this?"', 'Write a more balanced version of the thought'] },
  { title: 'Cat-Cow Stretch', type: 'Movement', emoji: '🐱', duration: '3 min', desc: 'A gentle spinal movement that relieves back pain from feeding, carrying, and sleeping in awkward positions.', steps: ['Come to hands and knees on the floor', 'Inhale: let your belly drop, lift your head and tailbone (cow)', 'Exhale: round your spine toward the ceiling, tuck chin (cat)', 'Move slowly with your breath', 'Repeat 10 times'] },
  { title: 'Sound Bath', type: 'Mindfulness', emoji: '🔔', duration: '5 min', desc: 'Listening to singing bowls or bells calms the nervous system and requires no effort — just ears.', steps: ['Search "singing bowl meditation" on YouTube or Spotify', 'Lie down or sit comfortably', 'Close your eyes', 'Let the sound wash over you without analysing it', 'Breathe naturally for 5 minutes'] },
  { title: 'Finger Breathing', type: 'Breathing', emoji: '🖐️', duration: '2 min', desc: 'Tracing your fingers while breathing gives the anxious mind something to do while you calm down.', steps: ['Hold one hand up in front of you', 'With the other index finger, trace up the outside of your thumb as you inhale', 'Trace down the inside as you exhale', 'Continue tracing each finger up on inhale, down on exhale', 'Go back and forth until all tension has eased'] },
  { title: 'Evening Wind-Down', type: 'Mindfulness', emoji: '🌙', duration: '5 min', desc: 'A simple ritual to signal to your body that it\'s time to slow down — even if sleep feels impossible.', steps: ['Dim the lights in your room', 'Put your phone face down', 'Breathe in for 4, out for 8 — three times', 'Think of one moment from today you\'re glad happened', 'Let your body get heavy'] },
  { title: 'Values Anchor', type: 'CBT', emoji: '🧭', duration: '4 min', desc: 'Reconnecting with your values when you feel lost gives your brain a sense of direction and meaning.', steps: ['Ask yourself: "What kind of mother do I want to be?"', 'Pick one word — gentle, present, strong, warm', 'Ask: "Did I live that value at all today — even a little?"', 'Find one tiny example', 'Say: "That is who I am, even on hard days"'] },
  { title: 'Ice Cube Breathing', type: 'Grounding', emoji: '🧊', duration: '2 min', desc: 'Holding ice engages your senses completely and pulls you out of anxious thoughts immediately.', steps: ['Get a single ice cube from the freezer', 'Hold it in one palm', 'Focus entirely on the sensation — cold, wet, melting', 'Breathe slowly in and out', 'When it melts or you feel calmer, you\'re done'] },
  { title: 'Mindful Feeding', type: 'Mindfulness', emoji: '🍼', duration: '4 min', desc: 'Turn a feeding session into a mindfulness practice — you\'re already sitting still, use it.', steps: ['During your next feed, put your phone down', 'Look at your baby\'s face — really look', 'Notice one detail you haven\'t noticed before', 'Feel the weight of them in your arms', 'Take 5 slow breaths before picking up your phone again'] },
  { title: 'Ocean Breath', type: 'Breathing', emoji: '🌊', duration: '3 min', desc: 'Ujjayi breath — a soft constriction at the back of the throat creating a wave-like sound — calms instantly.', steps: ['Breathe in through your nose', 'Breathe out through your nose while slightly constricting your throat', 'You should hear a soft "hhhh" sound like the ocean', 'In for 4, out for 6', 'Repeat for 3 minutes with eyes closed'] },
  { title: 'Gentle Wrist Circles', type: 'Movement', emoji: '⭕', duration: '2 min', desc: 'Hours of holding and feeding strain the wrists. This relieves tension in under 2 minutes.', steps: ['Extend both arms in front of you', 'Make gentle fists', 'Rotate both wrists slowly clockwise 10 times', 'Rotate anticlockwise 10 times', 'Shake your hands out and roll your fingers open'] },
]

const ALL_INTENTIONS = [
  { text: 'Drink 8 glasses of water', emoji: '💧' },
  { text: 'Step outside for 5 minutes', emoji: '☀️' },
  { text: 'Accept help from someone today', emoji: '🤝' },
  { text: 'Eat one nourishing meal sitting down', emoji: '🥗' },
  { text: 'Take your vitamins or supplements', emoji: '💊' },
  { text: 'Send a voice note to a friend', emoji: '📱' },
  { text: 'Put on a real outfit today', emoji: '👗' },
  { text: 'Tell your baby something you love about them', emoji: '💬' },
  { text: 'Lie down for 10 minutes, eyes closed', emoji: '😴' },
  { text: 'Stretch your neck and shoulders', emoji: '🤸' },
  { text: 'Watch something that makes you laugh', emoji: '😂' },
  { text: 'Write down one thing you did well today', emoji: '✍️' },
  { text: 'Wash your face and brush your teeth', emoji: '🪥' },
  { text: 'Open a window and breathe fresh air', emoji: '🌬️' },
  { text: 'Say no to one thing today', emoji: '🙅' },
  { text: 'Ask someone how they\'re doing', emoji: '💛' },
  { text: 'Turn off notifications for one hour', emoji: '🔕' },
  { text: 'Make your bed or tidy one surface', emoji: '🛏️' },
  { text: 'Read something for yourself, not about babies', emoji: '📖' },
  { text: 'Listen to a song you love', emoji: '🎵' },
  { text: 'Give yourself credit for one hard thing you did', emoji: '🏅' },
  { text: 'Let dishes sit and rest instead', emoji: '🍽️' },
  { text: 'Text a friend you haven\'t spoken to in a while', emoji: '💌' },
  { text: 'Do one thing purely because it brings you joy', emoji: '✨' },
  { text: 'Eat breakfast before noon', emoji: '🍳' },
  { text: 'Look at an old photo that makes you happy', emoji: '📸' },
  { text: 'Light a candle or diffuse something that smells nice', emoji: '🕯️' },
  { text: 'Put your feet up for 5 minutes', emoji: '🦶' },
  { text: 'Compliment yourself once today', emoji: '💗' },
  { text: 'Order food instead of cooking — no guilt', emoji: '🛵' },
  { text: 'Sit in a sunny spot for a few minutes', emoji: '🌤️' },
  { text: 'Pet an animal if you have one', emoji: '🐾' },
  { text: 'Write down what you\'re grateful for today', emoji: '🌿' },
  { text: 'Take a 5-minute walk — even just around the block', emoji: '🚶' },
  { text: 'Put your baby down safely and breathe for 2 minutes', emoji: '🧘' },
  { text: 'Drink a warm drink slowly and mindfully', emoji: '☕' },
  { text: 'Take a photo of something beautiful today', emoji: '📷' },
  { text: 'Ask for what you need from your partner or family', emoji: '🗣️' },
  { text: 'Laugh at something silly with your baby', emoji: '😄' },
  { text: 'Wear something soft and comfortable', emoji: '🧸' },
  { text: 'Forgive yourself for something small', emoji: '🕊️' },
  { text: 'Do a 5-minute tidy of one room only', emoji: '🧹' },
  { text: 'Watch the sky for one minute', emoji: '🌥️' },
  { text: 'Eat a piece of fruit', emoji: '🍊' },
  { text: 'Hug someone for at least 20 seconds', emoji: '🤗' },
  { text: 'Write down one worry — then close the page', emoji: '📝' },
  { text: 'Drink a glass of water right now', emoji: '🥤' },
  { text: 'Put on a podcast you love while feeding', emoji: '🎧' },
  { text: 'Move your body for 5 minutes — any way that feels good', emoji: '💃' },
  { text: 'Let someone else make a decision today', emoji: '🤲' },
  { text: 'Make eye contact with your baby and smile', emoji: '👁️' },
  { text: 'Remind yourself: this phase is temporary', emoji: '🌅' },
  { text: 'Do something creative — doodle, colour, write', emoji: '🎨' },
  { text: 'Take a longer shower than usual if you can', emoji: '🚿' },
  { text: 'Say thank you to someone who helped you', emoji: '🙏' },
  { text: 'Put your phone in another room for 30 minutes', emoji: '📵' },
  { text: 'Eat something with protein today', emoji: '🥚' },
  { text: 'Write down three small wins from this week', emoji: '🏆' },
  { text: 'Call your mum, sister, or a close friend', emoji: '📞' },
  { text: 'Wear comfortable shoes today', emoji: '👟' },
  { text: 'Stand in the kitchen and dance for one song', emoji: '🎶' },
  { text: 'Do nothing for 10 minutes — that is the task', emoji: '⏱️' },
  { text: 'Sit by water if you can — a river, fountain, or even your sink', emoji: '🌊' },
  { text: 'Read a poem — it takes 2 minutes', emoji: '📜' },
  { text: 'Roll your shoulders back and sit up tall for a while', emoji: '💺' },
  { text: 'Make plans with someone you\'ve been missing', emoji: '📅' },
  { text: 'Celebrate one tiny thing today with full sincerity', emoji: '🎉' },
  { text: 'Refill your water bottle right now', emoji: '🍶' },
  { text: 'Respond to one message you\'ve been putting off', emoji: '✉️' },
  { text: 'Take a nap if your baby naps — chores can wait', emoji: '💤' },
  { text: 'Look in the mirror and say something kind', emoji: '🪞' },
  { text: 'Smell something you love — coffee, lotion, fresh air', emoji: '👃' },
  { text: 'Cook or bake something simple you enjoy', emoji: '🍪' },
  { text: 'Let yourself cry if you need to — it is healthy', emoji: '💧' },
  { text: 'Find one thing that made you smile today', emoji: '😌' },
  { text: 'Put a photo of someone you love where you can see it', emoji: '🖼️' },
  { text: 'Eat your favourite comfort food with zero guilt', emoji: '🍫' },
  { text: 'Take five minutes to do absolutely nothing', emoji: '🌸' },
  { text: 'Do one task from your to-do list — just one', emoji: '✅' },
  { text: 'Sing to your baby, even if your voice isn\'t perfect', emoji: '🎤' },
  { text: 'Spend 10 minutes outside without a purpose', emoji: '🌳' },
  { text: 'Wear your favourite colour today', emoji: '🌈' },
  { text: 'Buy yourself one small thing that costs under $5', emoji: '🛍️' },
  { text: 'Watch a funny video and let yourself really laugh', emoji: '🤣' },
  { text: 'Notice five things that are going right today', emoji: '🌟' },
  { text: 'Give your baby a long, slow cuddle with no phone', emoji: '👶' },
  { text: 'Tell someone how you\'re really feeling', emoji: '💬' },
  { text: 'Rest your eyes — no screens — for 10 minutes', emoji: '👀' },
  { text: 'Let go of one expectation you had for today', emoji: '🎈' },
  { text: 'Acknowledge that you kept a human alive today', emoji: '💪' },
  { text: 'Put something beautiful near your feeding spot', emoji: '🌺' },
  { text: 'Plan one thing to look forward to this week', emoji: '📆' },
  { text: 'Be gentle with yourself — you are doing enough', emoji: '🌙' },
  { text: 'Write a short message to your future self', emoji: '🕰️' },
  { text: 'Let yourself receive a compliment fully today', emoji: '🌷' },
  { text: 'Reach out to another new mum today', emoji: '👩' },
  { text: 'Do something just for you — not for anyone else', emoji: '⭐' },
  { text: 'Remember that bad days do not make you a bad mother', emoji: '🤍' },
]

// Pick 3 exercises for today based on the date — same 3 all day, different each day
function getTodaysExercises() {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  const picked = []
  const used = new Set()
  let i = 0
  while (picked.length < 3) {
    const idx = Math.abs(Math.floor((seed * (i + 7) * 1234567891) % EXERCISES.length)) % EXERCISES.length
    if (!used.has(idx)) { used.add(idx); picked.push(EXERCISES[idx]) }
    i++
  }
  return picked
}

// Pick 3 intentions for today based on the date — same 3 all day, different each day
function getTodaysTasks() {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  const picked = []
  const used = new Set()
  let i = 0
  while (picked.length < 3) {
    const idx = (seed * (i + 1) * 2654435761) % ALL_INTENTIONS.length
    const safeIdx = Math.abs(Math.floor(idx)) % ALL_INTENTIONS.length
    if (!used.has(safeIdx)) { used.add(safeIdx); picked.push({ id: safeIdx, ...ALL_INTENTIONS[safeIdx], done: false }) }
    i++
  }
  return picked
}

function BreathingPlayer({ exercise, onDone, onClose }) {
  const [step, setStep] = useState(0)
  const done = step >= exercise.steps.length

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(61,32,48,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 200, padding: 24,
    }}>
      <div style={{
        background: '#fff', borderRadius: 24, padding: 32,
        width: '100%', maxWidth: 360, textAlign: 'center',
        boxShadow: '0 8px 40px rgba(61,32,48,0.2)',
      }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>{exercise.emoji}</div>
        <h2 style={{ marginBottom: 8 }}>{exercise.title}</h2>
        {!done ? (
          <>
            <div style={{
              background: 'var(--pink-50)', borderRadius: 16, padding: '24px 20px',
              margin: '20px 0', fontSize: 18, color: 'var(--text-dark)', lineHeight: 1.5,
            }}>
              {exercise.steps[step]}
            </div>
            <div style={{ color: 'var(--text-light)', fontSize: 13, marginBottom: 20 }}>
              Step {step + 1} of {exercise.steps.length}
            </div>
            <button className="btn-primary" onClick={() => setStep(s => s + 1)}>
              {step < exercise.steps.length - 1 ? 'Next →' : 'Finish ✓'}
            </button>
          </>
        ) : (
          <>
            <p style={{ color: 'var(--text-mid)', margin: '20px 0 24px', fontSize: 15, lineHeight: 1.6 }}>
              Wonderful. You did something kind for yourself today. 🌸
            </p>
            <button className="btn-primary" onClick={onDone}>Mark complete</button>
          </>
        )}
        <button className="btn-ghost" onClick={onClose} style={{ marginTop: 12, width: '100%' }}>
          Close
        </button>
      </div>
    </div>
  )
}

export default function HomeTab({ user, todayMood, streak, onLogMood, onLogExercise, notifEnabled, onEnableNotifications }) {
  const [checklist, setChecklist] = useState(() => getTodaysTasks())
  const [todaysExercises] = useState(() => getTodaysExercises())
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [showExercise, setShowExercise] = useState(false)
  const [exerciseDone, setExerciseDone] = useState(false)
  const today = new Date()
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' })
  const monthDay = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

  const toggleTask = (id) => {
    setChecklist(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const handleExerciseDone = () => {
    setShowExercise(false)
    setExerciseDone(true)
    onLogExercise()
  }

  const babyAge = user?.birthDate
    ? (() => {
        const birth = new Date(user.birthDate)
        const diff = Math.floor((today - birth) / (1000 * 60 * 60 * 24))
        if (diff < 7) return `${diff} day${diff !== 1 ? 's' : ''} old`
        if (diff < 30) return `${Math.floor(diff / 7)} week${Math.floor(diff / 7) !== 1 ? 's' : ''} old`
        return `${Math.floor(diff / 30)} month${Math.floor(diff / 30) !== 1 ? 's' : ''} old`
      })()
    : null

  return (
    <div>
      {showExercise && selectedExercise && (
        <BreathingPlayer
          exercise={selectedExercise}
          onDone={handleExerciseDone}
          onClose={() => setShowExercise(false)}
        />
      )}

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, var(--pink-100) 0%, var(--cream) 100%)',
        padding: '52px 20px 20px',
      }}>
        <p style={{ color: 'var(--text-light)', fontSize: 13 }}>{dayOfWeek}, {monthDay}</p>
        <h1 style={{ marginTop: 4 }}>
          Hello, {user?.name || 'mama'} 🌸
        </h1>
        {babyAge && (
          <p style={{ color: 'var(--text-mid)', fontSize: 14, marginTop: 4 }}>
            Your baby is {babyAge} — you're doing beautifully.
          </p>
        )}
      </div>

      {/* Streak banner */}
      {streak > 0 && (
        <div style={{
          margin: '10px 16px',
          background: 'linear-gradient(135deg, var(--pink-400), var(--pink-500))',
          borderRadius: 16,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          color: '#fff',
          boxShadow: '0 4px 14px rgba(212, 72, 114, 0.3)',
        }}>
          <span style={{ fontSize: 28 }}>🔥</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>{streak}-day streak</div>
            <div style={{ fontSize: 13, opacity: 0.9 }}>Keep showing up for yourself</div>
          </div>
        </div>
      )}

      {/* Mood Check-in */}
      <div className="card">
        <h3 style={{ marginBottom: 4 }}>How are you feeling?</h3>
        <p style={{ color: 'var(--text-light)', fontSize: 13, marginBottom: 16 }}>
          {todayMood ? 'Your mood is logged for today ✓' : 'Tap to log your mood'}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
          {MOODS.map(m => (
            <button
              key={m.score}
              onClick={() => onLogMood(m.score)}
              style={{
                flex: 1,
                background: todayMood === m.score ? 'var(--pink-100)' : 'var(--pink-50)',
                border: todayMood === m.score ? '2px solid var(--pink-400)' : '2px solid transparent',
                borderRadius: 14,
                padding: '10px 0',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                transition: 'all 0.15s',
                transform: todayMood === m.score ? 'scale(1.08)' : 'scale(1)',
              }}
            >
              <span style={{ fontSize: 26 }}>{m.emoji}</span>
              <span style={{ fontSize: 10, color: 'var(--text-light)' }}>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Exercise — 3 choices */}
      <div className="card">
        <p style={{ fontSize: 11, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
          Today's exercise
        </p>
        <h3 style={{ marginBottom: 4 }}>
          {exerciseDone ? '✓ Exercise complete 🌸' : 'Pick what feels right today'}
        </h3>
        <p style={{ color: 'var(--text-light)', fontSize: 13, marginBottom: 16 }}>
          {exerciseDone ? 'You did something kind for yourself today.' : 'Three options chosen just for today.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {todaysExercises.map((ex, i) => {
            const isSelected = selectedExercise?.title === ex.title
            const isDone = exerciseDone && isSelected
            return (
              <button
                key={i}
                onClick={() => {
                  if (exerciseDone) return
                  setSelectedExercise(ex)
                  setShowExercise(true)
                }}
                disabled={exerciseDone}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px', borderRadius: 16,
                  border: isDone
                    ? '2px solid var(--pink-400)'
                    : isSelected
                    ? '2px solid var(--pink-300)'
                    : '1.5px solid var(--pink-100)',
                  background: isDone
                    ? 'var(--pink-50)'
                    : 'white',
                  cursor: exerciseDone ? 'default' : 'pointer',
                  textAlign: 'left', width: '100%',
                  transition: 'all 0.15s',
                  opacity: exerciseDone && !isDone ? 0.45 : 1,
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: 'var(--pink-50)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                }}>
                  {isDone ? '✅' : ex.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-dark)', marginBottom: 3 }}>
                    {ex.title}
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{
                      fontSize: 11, background: 'var(--pink-100)', color: 'var(--pink-500)',
                      padding: '2px 8px', borderRadius: 50,
                    }}>{ex.type}</span>
                    <span style={{
                      fontSize: 11, background: '#f0f0f0', color: '#888',
                      padding: '2px 8px', borderRadius: 50,
                    }}>⏱ {ex.duration}</span>
                  </div>
                </div>
                {!exerciseDone && (
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, var(--pink-400), var(--pink-500))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 14,
                  }}>▶</div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Daily Checklist */}
      <div className="card" style={{ marginBottom: 0 }}>
        <h3 style={{ marginBottom: 16 }}>Daily intentions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {checklist.map(task => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: task.done ? 'var(--pink-50)' : '#fff',
                border: '1.5px solid var(--pink-100)',
                borderRadius: 12,
                padding: '12px 14px',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s',
              }}
            >
              <div style={{
                width: 24, height: 24, borderRadius: 50,
                background: task.done ? 'var(--pink-400)' : 'transparent',
                border: `2px solid ${task.done ? 'var(--pink-400)' : 'var(--pink-200)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.15s',
              }}>
                {task.done && <span style={{ color: '#fff', fontSize: 12 }}>✓</span>}
              </div>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{task.emoji}</span>
              <span style={{
                fontSize: 14,
                color: task.done ? 'var(--text-light)' : 'var(--text-dark)',
                textDecoration: task.done ? 'line-through' : 'none',
              }}>{task.text}</span>
            </button>
          ))}
        </div>
      </div>

      {!notifEnabled && typeof Notification !== 'undefined' && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ fontSize: 28 }}>🔔</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: 4 }}>Stay on track</h3>
              <p style={{ color: 'var(--text-light)', fontSize: 13, marginBottom: 12 }}>
                Get a gentle daily reminder to check in.
              </p>
              <button
                onClick={onEnableNotifications}
                className="btn-primary"
                style={{ fontSize: 14, padding: '12px 24px' }}
              >
                Enable reminders
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ height: 8 }} />
    </div>
  )
}
