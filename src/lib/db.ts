import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey)
    throw new Error("Connection to SUPABASE Database failed", { cause: "Missing SUPABASE_URL or SUPABASE_KEY"  });

const client = createClient(supabaseUrl!, supabaseKey!)

export default client
