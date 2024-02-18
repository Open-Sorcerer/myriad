import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey)
	throw new Error('Connection to SUPABASE Database failed', { cause: 'Missing SUPABASE_URL or SUPABASE_KEY' })

export const client = createClient(supabaseUrl!, supabaseKey!)
