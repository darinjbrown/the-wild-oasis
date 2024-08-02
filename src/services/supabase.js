import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://hifliweiutjofltdpdvh.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZmxpd2VpdXRqb2ZsdGRwZHZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzNzg4NTQsImV4cCI6MjAzNTk1NDg1NH0.Lh25fqMS-wroQw_rcQBQj8Ya3ynhazZpURkdqIM-O8E';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
