// Konfigurasi Koneksi Supabase (SUDAH DIPERBAIKI)
const SUPABASE_URL = 'https://scethjcyzfypfnlqhwkl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjZXRoamN5emZ5cGZubHFod2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxNzE4ODcsImV4cCI6MjExMDc0Nzg4N30.ZdAMpFG5TFZoReujJ9d1K_4WpUJZVaeOu9dQrVupK9Q';

// Inisialisasi Client Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Email pembeda hak akses
const EMAIL_ADMIN = 'admin@sekolah.sch.id';
const EMAIL_ABSEN = 'absen@sekolah.sch.id';

// Fungsi cek sesi login & proteksi halaman
async function cekAksesHalaman(roleWajib) {
    const { data: { session } } = await supabaseClient.auth.getSession();
    
    if (!session) {
        alert('Silakan login terlebih dahulu!');
        window.location.href = 'index.html';
        return null;
    }

    const emailUser = session.user.email;

    if (roleWajib === 'admin' && emailUser !== EMAIL_ADMIN) {
        alert('Akses ditolak! Halaman ini khusus Administrator.');
        window.location.href = 'index.html';
        return null;
    }

    return session.user;
}

// Fungsi Logout
async function logoutSistem() {
    await supabaseClient.auth.signOut();
    window.location.href = 'index.html';
}