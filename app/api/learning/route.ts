import { z } from 'zod'

// This contract is intentionally provider-agnostic. A future server-side provider
// can implement the same shape without changing the learning UI.
const learningSchema = z.object({
  title: z.string(),
  explanation: z.string(),
  keyPoints: z.array(z.string()).min(3).max(6),
  examples: z.array(z.object({ title: z.string(), explanation: z.string() })).min(2).max(4),
  practice: z.array(z.object({ prompt: z.string(), answer: z.string(), hint: z.string() })).min(2).max(4),
  quiz: z.array(z.object({ question: z.string(), options: z.array(z.string()).length(4), correctIndex: z.number().int().min(0).max(3), explanation: z.string() })).length(4),
  summary: z.string(),
})

type Lesson = z.infer<typeof learningSchema>
type LessonTemplate = Omit<Lesson, 'title'> & { title: string; aliases: string[] }

const lessons: Record<string, LessonTemplate[]> = {
  Mathematics: [{
    aliases: ['quadratic', 'quadratics', 'parabola'], title: 'Quadratic equations',
    explanation: 'A quadratic equation has the form ax² + bx + c = 0, where a is not zero. Its graph is a parabola, and solving the equation means finding the x-values where that parabola crosses the horizontal axis. You can solve quadratics by factoring, completing the square, or using the quadratic formula.',
    keyPoints: ['The highest power of x is 2.', 'Factoring turns one quadratic into two simpler linear equations.', 'The discriminant b² − 4ac predicts the number of real solutions.', 'A negative discriminant means the graph has no x-intercepts.'],
    examples: [{ title: 'Factoring', explanation: 'For x² + 5x + 6 = 0, find two numbers that multiply to 6 and add to 5: 2 and 3. So (x + 2)(x + 3) = 0, giving x = −2 or x = −3.' }, { title: 'Quadratic formula', explanation: 'For 2x² + 3x − 2 = 0, use x = (−b ± √(b² − 4ac)) / 2a. Substitution gives x = 1/2 or x = −2.' }],
    practice: [{ prompt: 'Solve x² − 9 = 0.', hint: 'Recognize a difference of squares.', answer: 'x = 3 or x = −3.' }, { prompt: 'How many real solutions does x² + 4x + 7 = 0 have?', hint: 'Calculate the discriminant.', answer: 'None; the discriminant is 16 − 28 = −12.' }],
    quiz: [{ question: 'What is the highest power in a quadratic?', options: ['1', '2', '3', '4'], correctIndex: 1, explanation: 'Quadratic means the variable is raised to the second power.' }, { question: 'What does a discriminant of zero indicate?', options: ['Two distinct real roots', 'No real roots', 'One repeated real root', 'An impossible equation'], correctIndex: 2, explanation: 'When b² − 4ac equals zero, the two formula results are the same.' }, { question: 'Which pair factors x² + 7x + 12?', options: ['(x + 2)(x + 6)', '(x + 3)(x + 4)', '(x − 3)(x − 4)', '(x + 1)(x + 12)'], correctIndex: 1, explanation: '3 and 4 multiply to 12 and add to 7.' }, { question: 'A parabola with a positive a opens which way?', options: ['Upward', 'Downward', 'Left', 'It is a line'], correctIndex: 0, explanation: 'The sign of a controls the direction of the parabola.' }],
    summary: 'Quadratics are second-degree equations. Choose a method, solve for the roots, and use the discriminant to understand how many real answers to expect.',
  }],
  Physics: [{
    aliases: ['newton', 'force', 'motion', 'laws'], title: "Newton's laws of motion",
    explanation: 'Newton’s laws connect motion to force. The first law describes inertia, the second gives the relationship F = ma, and the third says forces come in equal and opposite pairs. Together, they provide a model for predicting how an object’s velocity changes.',
    keyPoints: ['Net force is the vector sum of all forces.', 'Acceleration points in the direction of net force.', 'Mass measures resistance to a change in motion.', 'Action–reaction forces act on different objects.'],
    examples: [{ title: 'Pushing a cart', explanation: 'If a 10 kg cart experiences a net force of 20 N, its acceleration is a = F/m = 20/10 = 2 m/s².' }, { title: 'A book on a table', explanation: 'Gravity pulls the book down while the table pushes it up. These balanced forces give a net force of zero, so the book remains at rest.' }],
    practice: [{ prompt: 'What net force accelerates a 4 kg object at 3 m/s²?', hint: 'Use F = ma.', answer: '12 N.' }, { prompt: 'Why do you move backward when a bus accelerates forward?', hint: 'Think about inertia.', answer: 'Your body tends to maintain its original state of motion while the bus moves forward.' }],
    quiz: [{ question: 'Which equation is Newton’s second law?', options: ['F = ma', 'E = mc²', 'p = mv²', 'v = d/t²'], correctIndex: 0, explanation: 'Force equals mass multiplied by acceleration.' }, { question: 'What is inertia?', options: ['A type of energy', 'Resistance to changes in motion', 'The speed of light', 'A force pair'], correctIndex: 1, explanation: 'Inertia is an object’s tendency to keep its current motion.' }, { question: 'Action and reaction forces act on…', options: ['The same object', 'Different objects', 'Only moving objects', 'Only massive objects'], correctIndex: 1, explanation: 'The pair is equal and opposite but acts across two interacting objects.' }, { question: 'If net force is zero, acceleration is…', options: ['Always increasing', 'Zero', 'Equal to mass', 'Negative one'], correctIndex: 1, explanation: 'With F = ma, zero net force means zero acceleration.' }],
    summary: 'Use Newton’s laws to connect forces and motion: net force causes acceleration, inertia resists change, and interactions create force pairs.',
  }],
  Biology: [{
    aliases: ['cell', 'cells', 'respiration', 'mitosis'], title: 'Cellular respiration',
    explanation: 'Cellular respiration is the set of reactions cells use to release usable energy from glucose. In aerobic respiration, glucose and oxygen are transformed into carbon dioxide, water, and ATP. Most ATP is produced in the mitochondria through the electron transport chain.',
    keyPoints: ['Glycolysis begins in the cytoplasm.', 'The Krebs cycle releases high-energy electron carriers.', 'The electron transport chain uses a proton gradient to make ATP.', 'Oxygen accepts electrons at the end of aerobic respiration.'],
    examples: [{ title: 'The overall equation', explanation: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP. The atoms are rearranged; they are not created or destroyed.' }, { title: 'Without oxygen', explanation: 'Cells can use fermentation to regenerate electron carriers and keep glycolysis running, but it produces much less ATP.' }],
    practice: [{ prompt: 'Where does glycolysis occur?', hint: 'It happens before the mitochondria are involved.', answer: 'In the cytoplasm.' }, { prompt: 'Why is oxygen important in aerobic respiration?', hint: 'Consider the final step of the electron transport chain.', answer: 'It is the final electron acceptor, allowing the chain to continue.' }],
    quiz: [{ question: 'What is the main usable energy molecule made?', options: ['DNA', 'ATP', 'CO₂', 'Oxygen'], correctIndex: 1, explanation: 'ATP is the cell’s immediately usable energy currency.' }, { question: 'Where does glycolysis take place?', options: ['Nucleus', 'Cytoplasm', 'Ribosome', 'Cell wall'], correctIndex: 1, explanation: 'Glycolysis occurs in the cytoplasm.' }, { question: 'What is a product of aerobic respiration?', options: ['Carbon dioxide', 'Nitrogen gas', 'DNA', 'Chlorophyll'], correctIndex: 0, explanation: 'Carbon dioxide is released as glucose is broken down.' }, { question: 'Fermentation is useful because it…', options: ['Makes more oxygen', 'Keeps glycolysis running', 'Creates DNA', 'Stops ATP production'], correctIndex: 1, explanation: 'It regenerates carriers so glycolysis can continue without oxygen.' }],
    summary: 'Respiration converts glucose into ATP. Glycolysis starts in the cytoplasm, while aerobic stages use mitochondria and oxygen to produce most ATP.',
  }],
  History: [{
    aliases: ['industrial', 'revolution', 'history'], title: 'The Industrial Revolution',
    explanation: 'The Industrial Revolution was a period of rapid economic and social change that began in Britain in the late 1700s. Mechanized production, new energy sources, factories, and expanding transportation increased output while also transforming cities, labor, and class structures.',
    keyPoints: ['Factories centralized production and labor.', 'Steam power reduced dependence on water and muscle.', 'Urbanization grew as people moved toward industrial work.', 'Industrialization brought both higher output and difficult working conditions.'],
    examples: [{ title: 'Textile production', explanation: 'Spinning and weaving machines allowed cloth to be produced faster and more cheaply, helping factory owners scale production.' }, { title: 'Railways', explanation: 'Railways moved raw materials and finished goods quickly, linking mines, factories, ports, and growing cities.' }],
    practice: [{ prompt: 'Name one way factories changed work.', hint: 'Compare home production with centralized production.', answer: 'Work became centralized, scheduled, and organized around machines.' }, { prompt: 'Why did cities grow during industrialization?', hint: 'Think about where new jobs were located.', answer: 'People migrated toward factories and industrial jobs.' }],
    quiz: [{ question: 'Where did the Industrial Revolution begin?', options: ['Britain', 'Brazil', 'Japan', 'Egypt'], correctIndex: 0, explanation: 'The first industrial transformation began in Britain.' }, { question: 'Which energy source powered many early machines?', options: ['Steam', 'Solar panels', 'Nuclear power', 'Wind turbines'], correctIndex: 0, explanation: 'Steam engines converted heat into mechanical work.' }, { question: 'What is urbanization?', options: ['Growth of rural farms', 'Growth of cities', 'Decline of trade', 'Spread of forests'], correctIndex: 1, explanation: 'Urbanization is the growth of cities, often through migration.' }, { question: 'Industrialization affected society by…', options: ['Ending all inequality', 'Changing labor and class structures', 'Removing transportation', 'Stopping population growth'], correctIndex: 1, explanation: 'New industries changed who worked where and how wealth was organized.' }],
    summary: 'Industrialization used machines, factories, and new energy to increase production. It also reshaped cities, work, transportation, and social classes.',
  }],
}

const requestSchema = z.object({ subject: z.string().trim().min(1).max(80), topic: z.string().trim().min(1).max(200), level: z.string().trim().min(1).max(40), difficulty: z.string().trim().min(1).max(40) })

function findLesson(subject: string, topic: string) {
  const options = lessons[subject] ?? lessons.Mathematics
  const normalized = topic.toLowerCase()
  return options.find((lesson) => lesson.aliases.some((alias) => normalized.includes(alias))) ?? options[0]
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'Please provide a subject and topic.' }, { status: 400 })
  const { subject, topic } = parsed.data
  const lesson = findLesson(subject, topic)
  const result = { ...lesson, title: topic.trim().length > 2 ? lesson.title : lesson.title }
  return Response.json(learningSchema.parse(result))
}

// A future provider adapter can replace findLesson while preserving this route's contract.
// Keep provider keys and network calls server-side when that adapter is introduced.
