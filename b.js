
  
        const playlistData = [
            
            {
                id: 2,
                title: "Đảo Không Người",
                artist: "Nhâm Nhiên",
                src: "./muzic/Đảo Không Người -Nhậm Nhiên- MinhXT2nd Remix (Style Quivy x Quyền Minor)_ Nhạc Remix Gần Hot Tik Tok.mp3",
                cover: "./background/a2.jpg"
            },
            {
                id: 3,
                title: "Illusionary Daytime",
                artist: "Unknown",
                src: "./muzic/illusionary Daytime-Trackmaker (Douyin).mp3",
                cover: "./background/a4.jpg"
            },
            {
                id: 4,
                title: "Không Đáng",
                artist: "Mộng Phi Thuyền",
                src: "./muzic/không đáng 不值得 remix.mp3",
                cover: "./background/a5.jpg"
            },

            {
                id: 1,
                title: "Dự Tính",
                artist: "Đại Lý Nhân",
                src: "./muzic/•_ Dự Tính (Hot tiktok) bản RnB. 预谋（反正他都不难受），潮汐老李_• - (320 Kbps).mp3",
                cover: "./background/a1.jpg"
            },

            {
                id: 5,
                title: "Xoá Đi",
                artist: "Hứa Gia Hào",
                src: "./muzic/XOÁ ĐI REMIX.mp3",
                cover: "./background/a6.jpg"
            },


            {
                id: 6,
                title: "Biển Đảo Và Em",
                artist: "Mã Dã",
                src: "./muzic/海屿你DJ x 孤雏 (DJ阿智Remix 2026) 求你别离开我 (DJ抖音版) Biển Đảo Và Em (Remix Tiktok) x Chú Chim Cô Đơn (Remix) - NT Music Trends.mp3",
                cover: "./background/a7.jpg"
            },
        ];

        // Global Variables
        let currentTrackIndex = 0;
        let isPlaying = false;
        const audio = new Audio();

        // DOM Elements
        const trackTitle = document.getElementById('track-title');
        const trackArtist = document.getElementById('track-artist');
        const trackCover = document.getElementById('track-cover');
        const btnPlayPause = document.getElementById('btn-play-pause');
        const playIcon = document.getElementById('play-icon');
        const btnNext = document.getElementById('btn-next');
        const btnPrev = document.getElementById('btn-prev');
        const progressBar = document.getElementById('progress-bar');
        const timeCurrent = document.getElementById('time-current');
        const timeTotal = document.getElementById('time-total');
        const playlistContainer = document.getElementById('playlist');
        const playingIndicator = document.getElementById('playing-indicator');

        // Initialize Player
        function initPlayer() {
            renderPlaylist();
            loadTrack(currentTrackIndex, false); // Load track but don't play automatically
        }

        // Load a specific track
        function loadTrack(index, playImmediately = true) {
            const track = playlistData[index];
            audio.src = track.src;
            trackTitle.textContent = track.title;
            trackArtist.textContent = track.artist;
            trackCover.src = track.cover;
            
            // Reset progress UI
            progressBar.value = 0;
            timeCurrent.textContent = "0:00";
            
            updatePlaylistActiveState(index);

            if (playImmediately) {
                playAudio();
            }
        }

        // Play audio
        function playAudio() {
            audio.play().then(() => {
                isPlaying = true;
                updatePlayPauseIcon();
                playingIndicator.classList.remove('hidden');
            }).catch(e => {
                console.log("Autoplay prevented or audio load error:", e);
                isPlaying = false;
                updatePlayPauseIcon();
            });
        }

        // Pause audio
        function pauseAudio() {
            audio.pause();
            isPlaying = false;
            updatePlayPauseIcon();
            playingIndicator.classList.add('hidden');
        }

        // Toggle Play/Pause
        function togglePlayPause() {
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        }

        // Update Play/Pause Icon
        function updatePlayPauseIcon() {
            if (isPlaying) {
                playIcon.className = "ph-fill ph-pause text-2xl";
                playIcon.classList.remove('ml-1'); // Remove specific margin for play icon balance
            } else {
                playIcon.className = "ph-fill ph-play text-2xl ml-1";
            }
        }

        // Next Track
        function nextTrack() {
            currentTrackIndex++;
            if (currentTrackIndex > playlistData.length - 1) {
                currentTrackIndex = 0; // Loop back to start
            }
            loadTrack(currentTrackIndex, true);
        }

        // Previous Track
        function prevTrack() {
            currentTrackIndex--;
            if (currentTrackIndex < 0) {
                currentTrackIndex = playlistData.length - 1; // Go to last track
            }
            loadTrack(currentTrackIndex, true);
        }

        // Format Time (seconds to M:SS)
        function formatTime(seconds) {
            if (isNaN(seconds)) return "0:00";
            const min = Math.floor(seconds / 60);
            const sec = Math.floor(seconds % 60);
            return `${min}:${sec < 10 ? '0' + sec : sec}`;
        }

        // Update Progress Bar
        function updateProgress() {
            const { duration, currentTime } = audio;
            if (duration) {
                const progressPercent = (currentTime / duration) * 100;
                progressBar.value = progressPercent;
                timeCurrent.textContent = formatTime(currentTime);
                timeTotal.textContent = formatTime(duration);
                
                // Optional: Dynamic background color for range slider
                progressBar.style.background = `linear-gradient(to right, #10b981 ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`;
            }
        }

        // Set Progress (When user clicks on the slider)
        function setProgress(e) {
            const duration = audio.duration;
            if(duration) {
                const value = e.target.value;
                audio.currentTime = (value * duration) / 100;
            }
        }

        // Render Playlist to DOM
        function renderPlaylist() {
            playlistContainer.innerHTML = '';
            playlistData.forEach((track, index) => {
                const li = document.createElement('li');
                li.className = `playlist-item flex items-center p-2 rounded-lg cursor-pointer text-sm mb-1 ${index === currentTrackIndex ? 'active' : ''}`;
                li.innerHTML = `
                    <div class="text-gray-400 w-6 text-xs text-center mr-2 font-mono">${index + 1}</div>
                    <div class="flex-1 min-w-0">
                        <div class="text-gray-200 truncate font-medium">${track.title}</div>
                        <div class="text-gray-500 text-xs truncate">${track.artist}</div>
                    </div>
                    <div class="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <i class="ph-fill ph-play-circle text-lg"></i>
                    </div>
                `;
                li.addEventListener('click', () => {
                    currentTrackIndex = index;
                    loadTrack(currentTrackIndex, true);
                });
                playlistContainer.appendChild(li);
            });
        }

        // Highlight active track in playlist
        function updatePlaylistActiveState(activeIndex) {
            const items = playlistContainer.querySelectorAll('.playlist-item');
            items.forEach((item, index) => {
                if (index === activeIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
            // Auto scroll playlist to active item
            if(items[activeIndex]) {
                items[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        // Event Listeners Setup
        btnPlayPause.addEventListener('click', togglePlayPause);
        btnNext.addEventListener('click', nextTrack);
        btnPrev.addEventListener('click', prevTrack);
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', nextTrack); // Auto play next track when ended
        progressBar.addEventListener('input', setProgress);
        
        // Wait for audio metadata to load to show total time
        audio.addEventListener('loadedmetadata', () => {
            timeTotal.textContent = formatTime(audio.duration);
        });

        // Start App
        document.addEventListener('DOMContentLoaded', initPlayer);
