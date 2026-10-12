import { createClient, SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Browser-only auth (session in localStorage) keeps every page static; RLS protects `saves`.
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null
