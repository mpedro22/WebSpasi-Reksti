import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://khsimouzktgxaugzjtzk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtoc2ltb3V6a3RneGF1Z3pqdHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3ODMzNjksImV4cCI6MjAzMzM1OTM2OX0.dlj_cyWdfS40SfisC6xw7ssbUBhabTfzmG1oCx3L5TI';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
