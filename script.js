// script.js - Gelişmiş Futbol Ligi Oyun Mantığı
// Bu dosya, HTML ve CSS ile birlikte çalışarak oyunun tüm dinamik işlevlerini sağlar.

document.addEventListener('DOMContentLoaded', () => {
    // Game objesi, oyunun tüm durumunu ve mantığını kapsar.
    const Game = {
        currentWeek: 1, // Mevcut hafta
        totalWeeks: 34, // Toplam hafta sayısı (18 takım için 2 devreli lig: (18-1) * 2 = 34 hafta)
        myTeamId: null, // Oyuncunun yönettiği takımın ID'si (başlangıçta null)
        coachName: 'Teknik Direktör', // Teknik direktör adı (varsayılan)
        teamsData: [], // Tüm takımların verileri
        playersData: [], // Tüm oyuncuların verileri
        matchResults: [], // Oynanmış maçların sonuçları
        transferMarket: [], // Transfer pazarındaki oyuncular
        newsFeed: [], // Oyun içi haber akışı
        pastSeasons: [], // Geçmiş sezonların kayıtları (şampiyon, lig tablosu vb.)
        teamPowerChart: null, // Chart.js grafiği için referans
        // Editörde yapılan geçici değişiklikleri tutmak için kopya veriler
        editorTeamsData: [],
        editorPlayersData: [],

        /**
         * Oyunun başlangıç verilerini (takımlar, oyuncular) oluşturur.
         * Yeni bir oyun başlatıldığında veya kayıtlı veri bulunmadığında kullanılır.
         */
        initializeData: function() {
            // Takım Verileri (Örnek veriler, 18 takım olacak şekilde güncellendi)
            this.teamsData = [
                { id: 'team1', name: 'Kartalspor', power: 85, budget: 5000000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/FF5733/FFFFFF?text=K1' },
                { id: 'team2', name: 'Aslan FK', power: 88, budget: 5200000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/33A4FF/FFFFFF?text=A2' },
                { id: 'team3', name: 'Kaplanlar', power: 82, budget: 4800000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/33FF57/FFFFFF?text=K3' },
                { id: 'team4', name: 'Şimşek Gençlik', power: 80, budget: 4500000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/FF33E9/FFFFFF?text=Ş4' },
                { id: 'team5', name: 'Kurtuluşspor', power: 78, budget: 4200000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/FFCE33/FFFFFF?text=K5' },
                { id: 'team6', name: 'Yıldızlar FC', power: 90, budget: 5500000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/33FFF1/FFFFFF?text=Y6' },
                { id: 'team7', name: 'Zafer SK', power: 83, budget: 4900000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/B833FF/FFFFFF?text=Z7' },
                { id: 'team8', name: 'Demirspor', power: 86, budget: 5100000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/33FFB8/FFFFFF?text=D8' },
                { id: 'team9', name: 'Güneşspor', power: 79, budget: 4300000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/FF3333/FFFFFF?text=G9' },
                { id: 'team10', name: 'Gençlerbirliği', power: 81, budget: 4600000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/33A4FF/FFFFFF?text=G10' },
                { id: 'team11', name: 'Atılımspor', power: 77, budget: 4000000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/FF5733/FFFFFF?text=A11' },
                { id: 'team12', name: 'Güçlüler FK', power: 89, budget: 5300000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/33FF57/FFFFFF?text=G12' },
                { id: 'team13', name: 'Umutspor', power: 76, budget: 3800000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/33FFF1/FFFFFF?text=U13' },
                { id: 'team14', name: 'Akademi FC', power: 84, budget: 5000000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/B833FF/FFFFFF?text=A14' },
                { id: 'team15', name: 'Şampiyonlar FK', power: 92, budget: 5800000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/FF33E9/FFFFFF?text=Ş15' },
                { id: 'team16', name: 'Birlikspor', power: 75, budget: 3500000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/FFCE33/FFFFFF?text=B16' },
                { id: 'team17', name: 'Devler Takımı', power: 95, budget: 6000000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/33FFB8/FFFFFF?text=D17' },
                { id: 'team18', name: 'Yeni Güç SK', power: 70, budget: 3000000, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, logo: 'https://placehold.co/40x40/8A2BE2/FFFFFF?text=Y18' }
            ];

            // Oyuncu Verileri (Her takım için rastgele oyuncular oluşturulur)
            this.playersData = [];
            let playerIdCounter = 1;
            this.teamsData.forEach(team => {
                for (let i = 0; i < 15; i++) { // Her takım için 15 oyuncu
                    const basePower = team.power - 10 + Math.floor(Math.random() * 20); // Takım gücüne göre oyuncu gücü
                    const power = Math.max(60, Math.min(99, basePower)); // Gücü 60-99 arasında tut
                    const salary = power * 5000 + Math.floor(Math.random() * 20000); // Güce göre maaş
                    const value = power * 10000 + Math.floor(Math.random() * 50000); // Güce göre değer

                    this.playersData.push({
                        id: `player${playerIdCounter++}`,
                        name: this.generateRandomPlayerName(), // Rastgele oyuncu adı
                        teamId: team.id,
                        position: ['GK', 'DEF', 'MID', 'FWD'][Math.floor(Math.random() * 4)], // Rastgele pozisyon
                        power: power,
                        salary: salary,
                        value: value,
                        isTransferable: false // Başlangıçta transferde değil
                    });
                }
            });

            // Takım güçlerini oluşturulan oyunculara göre yeniden hesapla
            this.teamsData.forEach(team => this.updateTeamPower(team));

            this.matchResults = [];
            this.currentWeek = 1;
            this.transferMarket = [];
            this.newsFeed = [];
            this.pastSeasons = []; // Yeni oyun başlatıldığında geçmiş sezonları sıfırla
            this.myTeamId = null; // Takım seçimi yapılana kadar null
            this.coachName = 'Teknik Direktör'; // Varsayılan teknik direktör adı
        },

        /**
         * Rastgele bir oyuncu adı oluşturur.
         * @returns {string} Rastgele oyuncu adı
         */
        generateRandomPlayerName: function() {
            const firstNames = ['Ali', 'Can', 'Deniz', 'Emre', 'Furkan', 'Gökhan', 'Hakan', 'İbrahim', 'Mert', 'Ozan', 'Umut', 'Yiğit', 'Arda', 'Berke', 'Cem'];
            const lastNames = ['Yılmaz', 'Demir', 'Kaya', 'Şahin', 'Çelik', 'Aslan', 'Doğan', 'Öztürk', 'Koç', 'Can', 'Güneş', 'Aksoy', 'Erdem', 'Polat', 'Duran'];
            return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
        },

        /**
         * Kullanıcı arayüzünü (UI) mevcut oyun durumuna göre günceller.
         */
        renderUI: function() {
            this.renderDashboard();
            this.renderLeagueTable();
            this.renderMatchResults();
            this.renderTeamManagement();
            this.renderTransferMarket();
            this.renderFinances();
            this.renderNewsFeed();
            this.updateCurrentWeekDisplay();
            this.updateMyTeamBudgetDisplay();
            this.updateCoachNameDisplay(); // Teknik direktör adını güncelle

            // Editör sekmesi açıksa onu da güncelle
            if (document.getElementById('game-editor').style.display === 'block') {
                this.renderEditor();
            }
            // Geçmiş Sezonlar sekmesi açıksa onu da güncelle
            if (document.getElementById('past-seasons').style.display === 'block') {
                this.renderPastSeasons();
            }
        },

        /**
         * Mevcut hafta ve toplam hafta sayısını gösteren alanları günceller.
         */
        updateCurrentWeekDisplay: function() {
            document.getElementById('current-week').textContent = this.currentWeek;
            document.getElementById('total-weeks').textContent = this.totalWeeks;
            const myTeam = this.teamsData.find(team => team.id === this.myTeamId);
            document.getElementById('my-team-name').textContent = myTeam ? myTeam.name : 'Takımım Seçilmedi';
        },

        /**
         * Oyuncunun takımının bütçesini gösteren alanı günceller.
         */
        updateMyTeamBudgetDisplay: function() {
            const myTeam = this.teamsData.find(team => team.id === this.myTeamId);
            if (myTeam) {
                document.getElementById('my-team-budget').textContent = this.formatCurrency(myTeam.budget);
            } else {
                document.getElementById('my-team-budget').textContent = this.formatCurrency(0);
            }
        },

        /**
         * Teknik direktör adını başlıkta gösterir.
         */
        updateCoachNameDisplay: function() {
            document.getElementById('coach-name-display').textContent = this.coachName;
        },

        /**
         * Dashboard sekmesini günceller.
         */
        renderDashboard: function() {
            const myTeam = this.teamsData.find(team => team.id === this.myTeamId);
            const dashboardElements = ['dashboard-team-name', 'dashboard-team-power', 'dashboard-team-budget', 'dashboard-team-record', 'dashboard-team-rank', 'dashboard-player-info', 'dashboard-last-match'];

            if (!myTeam) {
                dashboardElements.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.textContent = 'Takım Seçilmedi';
                });
                document.getElementById('dashboard-last-match').textContent = 'Henüz maç oynanmadı.';
                document.getElementById('edit-my-team-button').disabled = true; // Takım seçilene kadar butonu devre dışı bırak
                this.updateChart(); // Grafik yine de güncellensin
                return;
            } else {
                document.getElementById('edit-my-team-button').disabled = false;
            }


            document.getElementById('dashboard-team-name').textContent = myTeam.name;
            document.getElementById('dashboard-team-power').textContent = `Güç: ${myTeam.power}`;
            document.getElementById('dashboard-team-budget').textContent = `Bütçe: ${this.formatCurrency(myTeam.budget)}`;
            document.getElementById('dashboard-team-record').textContent = `Kayıt: ${myTeam.wins} G / ${myTeam.draws} B / ${myTeam.losses} M`;

            // En son oynanan maç sonucunu göster
            const lastMatch = this.matchResults
                .filter(m => m.week === (this.currentWeek - 1)) // Bir önceki haftanın maçlarını al
                .find(m => m.homeTeamId === myTeam.id || m.awayTeamId === myTeam.id); // Benim takımımın maçını bul

            const lastMatchElement = document.getElementById('dashboard-last-match');
            if (lastMatch) {
                const myScore = lastMatch.homeTeamId === myTeam.id ? lastMatch.homeScore : lastMatch.awayScore;
                const opponentTeamId = lastMatch.homeTeamId === myTeam.id ? lastMatch.awayTeamId : lastMatch.homeTeamId;
                const opponentTeam = this.teamsData.find(t => t.id === opponentTeamId);
                const opponentScore = lastMatch.homeTeamId === myTeam.id ? lastMatch.awayScore : lastMatch.homeScore;

                lastMatchElement.innerHTML = `Son Maç: ${myTeam.name} ${myScore} - ${opponentTeam.name} ${opponentScore}`;
            } else {
                lastMatchElement.textContent = 'Henüz maç oynanmadı.';
            }

            // Ligdeki sıralama
            // Sıralama için geçici bir kopya oluştur ve sırala
            const sortedTeamsForRank = [...this.teamsData].sort((a, b) => {
                if (b.points !== a.points) return b.points - a.points;
                const gdA = a.goalsFor - a.goalsAgainst;
                const gdB = b.goalsFor - b.goalsAgainst;
                if (gdB !== gdA) return gdB - gdA;
                return b.goalsFor - a.goalsFor;
            });
            const myTeamRank = sortedTeamsForRank.findIndex(team => team.id === myTeam.id) + 1;
            document.getElementById('dashboard-team-rank').textContent = `Sıralama: ${myTeamRank}.`;

            // Toplam oyuncu sayısı ve ortalama güç
            const myTeamPlayers = this.playersData.filter(player => player.teamId === myTeam.id);
            const totalPlayers = myTeamPlayers.length;
            const avgPower = totalPlayers > 0 ? (myTeamPlayers.reduce((sum, p) => sum + p.power, 0) / totalPlayers).toFixed(1) : 0;
            document.getElementById('dashboard-player-info').textContent = `Oyuncu Sayısı: ${totalPlayers} | Ortalama Güç: ${avgPower}`;

            // Grafik Güncelleme (Takım Güçleri)
            this.updateChart();
        },

        /**
         * Lig tablosunu günceller ve sıralamayı gösterir.
         */
        renderLeagueTable: function() {
            const tableBody = document.getElementById('league-table-body');
            tableBody.innerHTML = ''; // Tabloyu temizle

            // Takımları puan, averaj (gol farkı) ve atılan gole göre sırala
            const sortedTeams = [...this.teamsData].sort((a, b) => {
                if (b.points !== a.points) return b.points - a.points;
                const gdA = a.goalsFor - a.goalsAgainst;
                const gdB = b.goalsFor - b.goalsAgainst;
                if (gdB !== gdA) return gdB - gdA;
                return b.goalsFor - a.goalsFor;
            });

            sortedTeams.forEach((team, index) => {
                const row = document.createElement('tr');
                row.classList.add('league-table-row');
                if (team.id === this.myTeamId) {
                    row.classList.add('my-team-row'); // Benim takımım için özel bir CSS sınıfı ekle
                }
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td><img src="${team.logo}" alt="${team.name} Logo" class="team-logo-small"> ${team.name}</td>
                    <td>${team.played}</td>
                    <td>${team.wins}</td>
                    <td>${team.draws}</td>
                    <td>${team.losses}</td>
                    <td>${team.goalsFor}</td>
                    <td>${team.goalsAgainst}</td>
                    <td>${team.goalsFor - team.goalsAgainst}</td>
                    <td>${team.points}</td>
                    <td>${team.power}</td>
                `;
                tableBody.appendChild(row);
            });
        },

        /**
         * Maç sonuçları sekmesini günceller.
         */
        renderMatchResults: function() {
            const matchResultsContainer = document.getElementById('match-results-container');
            matchResultsContainer.innerHTML = ''; // Sonuçları temizle

            // Maçları haftalara göre grupla
            const resultsByWeek = {};
            this.matchResults.forEach(match => {
                if (!resultsByWeek[match.week]) {
                    resultsByWeek[match.week] = [];
                }
                resultsByWeek[match.week].push(match);
            });

            // En son haftadan başlayarak sonuçları göster
            const sortedWeeks = Object.keys(resultsByWeek).sort((a, b) => b - a);

            if (sortedWeeks.length === 0) {
                matchResultsContainer.innerHTML = '<p class="info-message">Henüz maç oynanmadı.</p>';
                return;
            }

            sortedWeeks.forEach(week => {
                const weekSection = document.createElement('div');
                weekSection.classList.add('match-week-section');
                weekSection.innerHTML = `<h3>Hafta ${week} Maç Sonuçları</h3>`;

                resultsByWeek[week].forEach(match => {
                    const homeTeam = this.teamsData.find(t => t.id === match.homeTeamId);
                    const awayTeam = this.teamsData.find(t => t.id === match.awayTeamId);

                    if (homeTeam && awayTeam) {
                        const matchItem = document.createElement('div');
                        matchItem.classList.add('match-result-item');
                        matchItem.innerHTML = `
                            <span class="team-name">${homeTeam.name}</span>
                            <span class="score">${match.homeScore} - ${match.awayScore}</span>
                            <span class="team-name">${awayTeam.name}</span>
                        `;
                        weekSection.appendChild(matchItem);
                    }
                });
                matchResultsContainer.appendChild(weekSection);
            });
        },

        /**
         * Takım Yönetimi sekmesini günceller (Oyuncunun kendi takımı).
         */
        renderTeamManagement: function() {
            const myTeam = this.teamsData.find(team => team.id === this.myTeamId);
            const playerList = document.getElementById('my-team-player-list');
            playerList.innerHTML = ''; // Oyuncu listesini temizle

            if (!myTeam) {
                document.getElementById('my-team-name-display').textContent = 'Takım Seçilmedi';
                document.getElementById('my-team-power-display').textContent = `Takım Gücü: N/A`;
                document.getElementById('my-team-budget-display').textContent = `Bütçe: ${this.formatCurrency(0)}`;
                playerList.innerHTML = '<p class="info-message">Lütfen önce bir takım seçin.</p>';
                return;
            }

            document.getElementById('my-team-name-display').textContent = myTeam.name;
            document.getElementById('my-team-power-display').textContent = `Takım Gücü: ${myTeam.power}`;
            document.getElementById('my-team-budget-display').textContent = `Bütçe: ${this.formatCurrency(myTeam.budget)}`;


            const myTeamPlayers = this.playersData.filter(player => player.teamId === myTeam.id);
            myTeamPlayers.forEach(player => {
                const playerItem = document.createElement('div');
                playerItem.classList.add('player-card');
                playerItem.innerHTML = `
                    <div class="player-info">
                        <h4>${player.name} (${player.position})</h4>
                        <p>Güç: ${player.power}</p>
                        <p>Maaş: ${this.formatCurrency(player.salary)}</p>
                        <p>Değer: ${this.formatCurrency(player.value)}</p>
                    </div>
                    <div class="player-actions">
                        <button class="button button-secondary" onclick="Game.openEditPlayerModal('${player.id}')">Düzenle</button>
                        <button class="button button-danger" onclick="Game.sellPlayer('${player.id}')">Sat</button>
                    </div>
                `;
                playerList.appendChild(playerItem);
            });
        },

        /**
         * Transfer Pazarı sekmesini günceller.
         * @param {Array} [filteredPlayers] - Filtrelenmiş oyuncu listesi (opsiyonel).
         */
        renderTransferMarket: function(filteredPlayers = this.transferMarket) {
            const transferList = document.getElementById('transfer-list');
            transferList.innerHTML = '';

            if (filteredPlayers.length === 0) {
                transferList.innerHTML = '<p class="info-message">Transfer pazarında oyuncu bulunmuyor.</p>';
                return;
            }

            filteredPlayers.forEach(player => {
                const playerTeam = this.teamsData.find(team => team.id === player.teamId);
                const playerItem = document.createElement('div');
                playerItem.classList.add('player-card', 'transfer-player-card');
                playerItem.innerHTML = `
                    <div class="player-info">
                        <h4>${player.name} (${player.position})</h4>
                        <p>Takım: ${playerTeam ? playerTeam.name : 'Bilinmiyor'}</p>
                        <p>Güç: ${player.power}</p>
                        <p>Maaş: ${this.formatCurrency(player.salary)}</p>
                        <p>Değer: ${this.formatCurrency(player.value)}</p>
                        <p>Transfer Ücreti: <span class="text-primary">${this.formatCurrency(player.transferFee)}</span></p>
                    </div>
                    <div class="player-actions">
                        <button class="button button-primary" ${player.teamId === this.myTeamId ? 'disabled' : ''} onclick="Game.buyPlayer('${player.id}')">Satın Al</button>
                    </div>
                `;
                transferList.appendChild(playerItem);
            });
        },

        /**
         * Finans sekmesini günceller.
         */
        renderFinances: function() {
            const myTeam = this.teamsData.find(team => team.id === this.myTeamId);
            if (!myTeam) {
                document.getElementById('current-budget').textContent = this.formatCurrency(0);
                document.getElementById('total-monthly-salary').textContent = this.formatCurrency(0);
                document.getElementById('weekly-salary-cost').textContent = this.formatCurrency(0);
                return;
            }

            document.getElementById('current-budget').textContent = this.formatCurrency(myTeam.budget);

            const myTeamPlayers = this.playersData.filter(player => player.teamId === myTeam.id);
            const totalMonthlySalary = myTeamPlayers.reduce((sum, player) => sum + player.salary, 0);
            document.getElementById('total-monthly-salary').textContent = this.formatCurrency(totalMonthlySalary);
            document.getElementById('weekly-salary-cost').textContent = this.formatCurrency(totalMonthlySalary / 4); // Basit bir haftalık maaş hesaplaması
        },

        /**
         * Haber Akışı sekmesini günceller.
         */
        renderNewsFeed: function() {
            const newsFeedContainer = document.getElementById('news-feed-list');
            newsFeedContainer.innerHTML = '';

            if (this.newsFeed.length === 0) {
                newsFeedContainer.innerHTML = '<p class="info-message">Yeni haber yok.</p>';
                return;
            }

            // En son 5 haberi göster (en yeni en üstte)
            this.newsFeed.slice(-5).reverse().forEach(news => {
                const newsItem = document.createElement('div');
                newsItem.classList.add('news-item');
                newsItem.innerHTML = `
                    <p><strong>Hafta ${news.week}:</strong> ${news.message}</p>
                `;
                newsFeedContainer.appendChild(newsItem);
            });
        },

        /**
         * Oyun Editörü sekmesini günceller.
         * Tüm takımları ve oyuncuları düzenlenebilir tablolar halinde gösterir.
         */
        renderEditor: function() {
            // Editörde geçici değişiklikler için verilerin kopyasını oluştur
            this.editorTeamsData = JSON.parse(JSON.stringify(this.teamsData));
            this.editorPlayersData = JSON.parse(JSON.stringify(this.playersData));

            const teamsBody = document.getElementById('editor-teams-body');
            teamsBody.innerHTML = ''; // Tabloyu temizle

            this.editorTeamsData.forEach(team => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${team.id}</td>
                    <td><input type="text" value="${team.name}" data-id="${team.id}" data-field="name" class="editor-input"></td>
                    <td><input type="number" value="${team.power}" data-id="${team.id}" data-field="power" min="60" max="99" class="editor-input"></td>
                    <td><input type="number" value="${team.budget}" data-id="${team.id}" data-field="budget" min="0" class="editor-input"></td>
                    <td><input type="text" value="${team.logo}" data-id="${team.id}" data-field="logo" class="editor-input"></td>
                    <td><button class="button button-danger button-small" onclick="Game.deleteTeam('${team.id}')"><i class="fas fa-trash"></i> Sil</button></td>
                `;
                teamsBody.appendChild(row);
            });

            // Oyuncu filtresi seçeneklerini doldur
            this.populateEditorTeamFilter();
            // Oyuncuları filtrele ve render et
            this.filterAndRenderEditorPlayers();
        },

        /**
         * Oyun editöründeki oyuncu filtresi seçeneklerini doldurur.
         */
        populateEditorTeamFilter: function() {
            const editorTeamFilter = document.getElementById('editor-team-filter');
            editorTeamFilter.innerHTML = '<option value="all">Tüm Takımlar</option>'; // Varsayılan seçenek

            this.teamsData.forEach(team => {
                const option = document.createElement('option');
                option.value = team.id;
                option.textContent = team.name;
                editorTeamFilter.appendChild(option);
            });
        },

        /**
         * Editördeki oyuncuları filtreler ve tabloyu günceller.
         */
        filterAndRenderEditorPlayers: function() {
            const playersBody = document.getElementById('editor-players-body');
            playersBody.innerHTML = '';

            const selectedTeamId = document.getElementById('editor-team-filter').value;
            const playerNameFilter = document.getElementById('editor-player-name-filter').value.toLowerCase();

            let filteredPlayers = this.editorPlayersData;

            if (selectedTeamId !== 'all') {
                filteredPlayers = filteredPlayers.filter(player => player.teamId === selectedTeamId);
            }
            if (playerNameFilter) {
                filteredPlayers = filteredPlayers.filter(player => player.name.toLowerCase().includes(playerNameFilter));
            }

            filteredPlayers.forEach(player => {
                const playerTeam = this.teamsData.find(t => t.id === player.teamId);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${player.id}</td>
                    <td><input type="text" value="${player.name}" data-id="${player.id}" data-field="name" class="editor-input"></td>
                    <td>
                        <select data-id="${player.id}" data-field="teamId" class="editor-input">
                            ${this.teamsData.map(team => `<option value="${team.id}" ${player.teamId === team.id ? 'selected' : ''}>${team.name}</option>`).join('')}
                        </select>
                    </td>
                    <td>
                        <select data-id="${player.id}" data-field="position" class="editor-input">
                            <option value="GK" ${player.position === 'GK' ? 'selected' : ''}>Kaleci</option>
                            <option value="DEF" ${player.position === 'DEF' ? 'selected' : ''}>Defans</option>
                            <option value="MID" ${player.position === 'MID' ? 'selected' : ''}>Orta Saha</option>
                            <option value="FWD" ${player.position === 'FWD' ? 'selected' : ''}>Forvet</option>
                        </select>
                    </td>
                    <td><input type="number" value="${player.power}" data-id="${player.id}" data-field="power" min="60" max="99" class="editor-input"></td>
                    <td><input type="number" value="${player.salary}" data-id="${player.id}" data-field="salary" min="10000" class="editor-input"></td>
                    <td>${this.formatCurrency(player.value)}</td>
                    <td><button class="button button-danger button-small" onclick="Game.deletePlayer('${player.id}')"><i class="fas fa-trash"></i> Sil</button></td>
                `;
                playersBody.appendChild(row);
            });
        },

        /**
         * Editörde yapılan tüm değişiklikleri kaydeder.
         * Geçici verileri ana verilere aktarır ve localStorage'a kaydeder.
         */
        saveEditorChanges: function() {
            let changesMade = false;
            let validationError = false;

            // Takım değişikliklerini işle
            document.querySelectorAll('#editor-teams-body tr').forEach(row => {
                const teamId = row.querySelector('[data-id]').dataset.id;
                const team = this.editorTeamsData.find(t => t.id === teamId);
                if (!team) return;

                const nameInput = row.querySelector('[data-field="name"]');
                const powerInput = row.querySelector('[data-field="power"]');
                const budgetInput = row.querySelector('[data-field="budget"]');
                const logoInput = row.querySelector('[data-field="logo"]');

                if (nameInput.value !== team.name) { team.name = nameInput.value; changesMade = true; }
                const newPower = parseInt(powerInput.value);
                if (newPower < 60 || newPower > 99 || isNaN(newPower)) {
                    validationError = true;
                    this.showMessage('Hata', `${team.name} takımının gücü 60-99 arasında olmalı.`, 'danger');
                    return;
                }
                if (newPower !== team.power) { team.power = newPower; changesMade = true; }

                const newBudget = parseInt(budgetInput.value);
                if (isNaN(newBudget) || newBudget < 0) {
                    validationError = true;
                    this.showMessage('Hata', `${team.name} takımının bütçesi geçerli bir sayı olmalı (min 0).`, 'danger');
                    return;
                }
                if (newBudget !== team.budget) { team.budget = newBudget; changesMade = true; }
                if (logoInput.value !== team.logo) { team.logo = logoInput.value; changesMade = true; }
            });

            if (validationError) return;

            // Oyuncu değişikliklerini işle
            document.querySelectorAll('#editor-players-body tr').forEach(row => {
                const playerId = row.querySelector('[data-id]').dataset.id;
                const player = this.editorPlayersData.find(p => p.id === playerId);
                if (!player) return;

                const nameInput = row.querySelector('[data-field="name"]');
                const teamIdSelect = row.querySelector('[data-field="teamId"]');
                const positionSelect = row.querySelector('[data-field="position"]');
                const powerInput = row.querySelector('[data-field="power"]');
                const salaryInput = row.querySelector('[data-field="salary"]');

                if (nameInput.value !== player.name) { player.name = nameInput.value; changesMade = true; }
                if (teamIdSelect.value !== player.teamId) { player.teamId = teamIdSelect.value; changesMade = true; }
                if (positionSelect.value !== player.position) { player.position = positionSelect.value; changesMade = true; }

                const newPower = parseInt(powerInput.value);
                if (newPower < 60 || newPower > 99 || isNaN(newPower)) {
                    validationError = true;
                    this.showMessage('Hata', `${player.name} oyuncusunun gücü 60-99 arasında olmalı.`, 'danger');
                    return;
                }
                if (newPower !== player.power) { player.power = newPower; changesMade = true; }

                const newSalary = parseInt(salaryInput.value);
                if (isNaN(newSalary) || newSalary < 10000) {
                    validationError = true;
                    this.showMessage('Hata', `${player.name} oyuncusunun maaşı geçerli bir sayı olmalı (min 10000).`, 'danger');
                    return;
                }
                if (newSalary !== player.salary) { player.salary = newSalary; changesMade = true; }

                // Oyuncunun değeri gücüne göre yeniden hesaplanmalı
                player.value = player.power * 10000 + Math.floor(Math.random() * 50000);
            });

            if (validationError) return;

            if (changesMade) {
                // Değişiklikleri ana verilere aktar
                this.teamsData = JSON.parse(JSON.stringify(this.editorTeamsData));
                this.playersData = JSON.parse(JSON.stringify(this.editorPlayersData));

                // Tüm takımların güçlerini oyuncu değişikliklerine göre yeniden hesapla
                this.teamsData.forEach(team => this.updateTeamPower(team));

                this.saveData();
                this.renderUI();
                this.showMessage('Başarılı', 'Tüm değişiklikler kaydedildi!', 'success');
            } else {
                this.showMessage('Bilgi', 'Hiçbir değişiklik yapılmadı.', 'info');
            }
        },

        /**
         * Editörde yapılan değişiklikleri iptal eder ve mevcut oyun durumuna geri döner.
         */
        cancelEditorChanges: function() {
            this.showMessage('Bilgi', 'Değişiklikler iptal edildi.', 'info');
            this.loadData(); // Kayıtlı veriyi yeniden yükle
            this.renderUI(); // Arayüzü yeniden çiz
        },

        /**
         * Belirtilen takımı editörden (ve geçici veriden) siler.
         * Kalıcı silme için saveEditorChanges çağrılmalıdır.
         * @param {string} teamId - Silinecek takımın ID'si.
         */
        deleteTeam: function(teamId) {
            const confirmDelete = document.getElementById('confirm-modal');
            document.getElementById('confirm-modal-title').textContent = 'Takımı Sil';
            document.getElementById('confirm-modal-text').textContent = 'Bu takımı ve tüm oyuncularını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!';
            document.getElementById('confirm-yes-button').onclick = () => {
                const initialTeamCount = this.editorTeamsData.length;
                this.editorTeamsData = this.editorTeamsData.filter(team => team.id !== teamId);
                this.editorPlayersData = this.editorPlayersData.filter(player => player.teamId !== teamId);

                if (this.editorTeamsData.length < initialTeamCount) {
                    this.showMessage('Başarılı', 'Takım ve oyuncuları geçici olarak silindi. Kaydetmek için "Tüm Değişiklikleri Kaydet" butonuna tıklayın.', 'info');
                    this.renderEditor(); // Editörü yeniden çiz
                } else {
                    this.showMessage('Hata', 'Takım silinemedi.', 'danger');
                }
                confirmDelete.style.display = 'none';
            };
            document.getElementById('confirm-no-button').onclick = () => {
                confirmDelete.style.display = 'none';
            };
            confirmDelete.style.display = 'flex';
        },

        /**
         * Belirtilen oyuncuyu editörden (ve geçici veriden) siler.
         * Kalıcı silme için saveEditorChanges çağrılmalıdır.
         * @param {string} playerId - Silinecek oyuncunun ID'si.
         */
        deletePlayer: function(playerId) {
            const confirmDelete = document.getElementById('confirm-modal');
            document.getElementById('confirm-modal-title').textContent = 'Oyuncuyu Sil';
            document.getElementById('confirm-modal-text').textContent = 'Bu oyuncuyu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!';
            document.getElementById('confirm-yes-button').onclick = () => {
                const initialPlayerCount = this.editorPlayersData.length;
                this.editorPlayersData = this.editorPlayersData.filter(player => player.id !== playerId);

                if (this.editorPlayersData.length < initialPlayerCount) {
                    this.showMessage('Başarılı', 'Oyuncu geçici olarak silindi. Kaydetmek için "Tüm Değişiklikleri Kaydet" butonuna tıklayın.', 'info');
                    this.filterAndRenderEditorPlayers(); // Oyuncuları yeniden çiz
                } else {
                    this.showMessage('Hata', 'Oyuncu silinemedi.', 'danger');
                }
                confirmDelete.style.display = 'none';
            };
            document.getElementById('confirm-no-button').onclick = () => {
                confirmDelete.style.display = 'none';
            };
            confirmDelete.style.display = 'flex';
        },

        /**
         * Bir sonraki haftayı simüle eder (maçlar, maaşlar, güncellemeler).
         */
        simulateNextWeek: function() {
            if (this.myTeamId === null) {
                this.showMessage('Hata', 'Lütfen oyuna başlamadan önce takımınızı seçin!', 'danger');
                return;
            }

            if (this.currentWeek > this.totalWeeks) {
                this.showMessage('Lig Bitti', 'Tebrikler! Sezon sona erdi. Lig tablosunu kontrol edin.', 'info');
                document.getElementById('simulate-week-button').disabled = true; // Butonu devre dışı bırak
                return;
            }

            this.showMessage('Hafta Simülasyonu', `${this.currentWeek}. Hafta simüle ediliyor...`, 'info');

            // Maçları oluştur ve simüle et
            const weekMatches = this.generateMatchesForWeek(this.currentWeek);
            weekMatches.forEach(match => {
                const homeTeam = this.teamsData.find(t => t.id === match.homeTeamId);
                const awayTeam = this.teamsData.find(t => t.id === match.awayTeamId);

                if (homeTeam && awayTeam) {
                    const { homeScore, awayScore } = this.simulateMatch(homeTeam, awayTeam);

                    // Takım istatistiklerini güncelle
                    homeTeam.goalsFor += homeScore;
                    homeTeam.goalsAgainst += awayScore;
                    awayTeam.goalsFor += awayScore;
                    awayTeam.goalsAgainst += homeScore;
                    homeTeam.played++;
                    awayTeam.played++;

                    if (homeScore > awayScore) {
                        homeTeam.wins++;
                        awayTeam.losses++;
                        homeTeam.points += 3; // Galibiyet 3 puan
                    } else if (awayScore > homeScore) {
                        awayTeam.wins++;
                        homeTeam.losses++;
                        awayTeam.points += 3;
                    } else {
                        homeTeam.draws++;
                        awayTeam.draws++;
                        homeTeam.points += 1; // Beraberlik 1 puan
                        awayTeam.points += 1;
                    }

                    // Maç sonucunu kaydet
                    this.matchResults.push({
                        week: this.currentWeek,
                        homeTeamId: homeTeam.id,
                        awayTeamId: awayTeam.id,
                        homeScore: homeScore,
                        awayScore: awayScore
                    });

                    // Haber akışına maç sonucunu ekle
                    this.newsFeed.push({
                        week: this.currentWeek,
                        message: `${homeTeam.name} (${homeScore}) - (${awayScore}) ${awayTeam.name}`
                    });
                }
            });

            // Haftalık maaş ödemeleri
            this.teamsData.forEach(team => {
                const teamPlayers = this.playersData.filter(p => p.teamId === team.id);
                const weeklySalaryCost = teamPlayers.reduce((sum, p) => sum + p.salary, 0) / 4; // Aylık maaşın çeyreği
                team.budget -= weeklySalaryCost;
                // Oyuncunun takımı bütçesi eksiye düşerse uyarı ver
                if (team.budget < 0 && team.id === this.myTeamId) {
                    this.showMessage('Bütçe Uyarısı', 'Takımınızın bütçesi eksiye düştü! Oyuncu satmayı düşünebilirsiniz.', 'warning');
                }
            });

            this.currentWeek++; // Haftayı ilerlet
            this.updateTeamPowersBasedOnPerformance(); // Takım güçlerini performansa göre güncelle
            this.updatePlayerValues(); // Oyuncu değerlerini güncelle
            this.refreshTransferMarket(); // Transfer pazarını yenile

            // Sezon sonu kontrolü
            if (this.currentWeek > this.totalWeeks) {
                this.endSeason();
            }

            this.saveData(); // Verileri kaydet
            this.renderUI(); // Arayüzü yeniden çiz
            this.showMessage('Hafta Sonuçlandı', `${this.currentWeek - 1}. Hafta tamamlandı!`, 'success');
        },

        /**
         * Sezon sonu işlemlerini yönetir: şampiyonu belirler, geçmiş sezonlara kaydeder.
         */
        endSeason: function() {
            // Lig tablosunu sırala
            const finalLeagueTable = [...this.teamsData].sort((a, b) => {
                if (b.points !== a.points) return b.points - a.points;
                const gdA = a.goalsFor - a.goalsAgainst;
                const gdB = b.goalsFor - b.goalsAgainst;
                if (gdB !== gdA) return gdB - gdA;
                return b.goalsFor - a.goalsFor;
            });

            const champion = finalLeagueTable[0];
            this.showMessage('Sezon Sonu!', `Şampiyon: ${champion.name} (${champion.points} Puan)!`, 'success');
            this.newsFeed.push({
                week: this.currentWeek - 1,
                message: `SEZON SONU! Şampiyon: ${champion.name}!`
            });

            // Geçmiş sezonlara kaydet
            this.pastSeasons.push({
                season: this.pastSeasons.length + 1, // Sezon numarası
                championTeamId: champion.id,
                championTeamName: champion.name,
                championPoints: champion.points,
                finalLeagueTable: finalLeagueTable.map(team => ({ // Tablonun bir kopyasını kaydet
                    id: team.id,
                    name: team.name,
                    played: team.played,
                    wins: team.wins,
                    draws: team.draws,
                    losses: team.losses,
                    goalsFor: team.goalsFor,
                    goalsAgainst: team.goalsAgainst,
                    points: team.points,
                    power: team.power,
                    logo: team.logo
                }))
            });

            // Yeni sezon için istatistikleri sıfırla (takım güçleri hariç)
            this.teamsData.forEach(team => {
                team.wins = 0;
                team.draws = 0;
                team.losses = 0;
                team.goalsFor = 0;
                team.goalsAgainst = 0;
                team.points = 0;
                team.played = 0;
            });
            this.matchResults = []; // Maç sonuçlarını sıfırla
            this.currentWeek = 1; // Haftayı sıfırla
            document.getElementById('simulate-week-button').disabled = false; // Butonu tekrar etkinleştir
        },

        /**
         * Geçmiş Sezonlar sekmesini günceller.
         */
        renderPastSeasons: function() {
            const pastSeasonsContainer = document.getElementById('past-seasons-container');
            pastSeasonsContainer.innerHTML = '';

            if (this.pastSeasons.length === 0) {
                pastSeasonsContainer.innerHTML = '<p class="info-message">Henüz tamamlanmış bir sezon yok.</p>';
                return;
            }

            // En son sezondan başlayarak göster
            [...this.pastSeasons].reverse().forEach(seasonData => {
                const seasonCard = document.createElement('div');
                seasonCard.classList.add('past-season-card');
                seasonCard.innerHTML = `
                    <h3>Sezon ${seasonData.season} Özeti</h3>
                    <p class="champion-info">Şampiyon: ${seasonData.championTeamName} (${seasonData.championPoints} Puan)</p>
                    <h4>Lig Tablosu:</h4>
                    <div class="table-responsive">
                        <table class="league-table">
                            <thead>
                                <tr>
                                    <th>Sıra</th>
                                    <th>Takım</th>
                                    <th>O</th>
                                    <th>G</th>
                                    <th>B</th>
                                    <th>M</th>
                                    <th>A</th>
                                    <th>Y</th>
                                    <th>Av.</th>
                                    <th>P</th>
                                    <th>Güç</th>
                                </tr>
                            </thead>
                            <tbody>
                                </tbody>
                        </table>
                    </div>
                `;
                const tableBody = seasonCard.querySelector('.league-table tbody');
                seasonData.finalLeagueTable.forEach((team, index) => {
                    const row = document.createElement('tr');
                    row.classList.add('league-table-row');
                    if (team.id === seasonData.championTeamId) {
                        row.classList.add('champion-row'); // Şampiyon takımı vurgula
                    }
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td><img src="${team.logo}" alt="${team.name} Logo" class="team-logo-small"> ${team.name}</td>
                        <td>${team.played}</td>
                        <td>${team.wins}</td>
                        <td>${team.draws}</td>
                        <td>${team.losses}</td>
                        <td>${team.goalsFor}</td>
                        <td>${team.goalsAgainst}</td>
                        <td>${team.goalsFor - team.goalsAgainst}</td>
                        <td>${team.points}</td>
                        <td>${team.power}</td>
                    `;
                    tableBody.appendChild(row);
                });
                pastSeasonsContainer.appendChild(seasonCard);
            });
        },

        /**
         * Belirli bir hafta için maç eşleşmeleri oluşturur.
         * Basit bir round-robin benzeri algoritma kullanır, gerçek fikstür için daha karmaşık olabilir.
         * @param {number} week - Maçların oluşturulacağı hafta numarası.
         * @returns {Array<Object>} Hafta için maç listesi.
         */
        generateMatchesForWeek: function(week) {
            const matches = [];
            const numTeams = this.teamsData.length;
            const allTeams = [...this.teamsData]; // Takımların kopyası

            // Bu sezon daha önce oynanmış tüm maç çiftlerini takip et
            const playedPairsThisSeason = new Set();
            this.matchResults.forEach(match => {
                playedPairsThisSeason.add(`${match.homeTeamId}-${match.awayTeamId}`);
                playedPairsThisSeason.add(`${match.awayTeamId}-${match.homeTeamId}`); // Ters eşleşmeyi de ekle
            });

            // Bu hafta oynayacak takımları takip etmek için
            const teamsPlayingThisWeek = new Set();

            // Her hafta numTeams / 2 kadar maç oynanır (18 takım için 9 maç)
            // Basit bir eşleşme algoritması: Her takımı bir kez oynatmaya çalış
            for (let i = 0; i < numTeams; i++) {
                const homeTeam = allTeams[i];
                if (teamsPlayingThisWeek.has(homeTeam.id)) continue; // Zaten oynamışsa geç

                // Rakip takım bul
                let awayTeam = null;
                const availableOpponents = allTeams.filter(team =>
                    team.id !== homeTeam.id && // Kendi takımı olmasın
                    !teamsPlayingThisWeek.has(team.id) && // Rakip takım bu hafta oynamamış olsun
                    !playedPairsThisSeason.has(`${homeTeam.id}-${team.id}`) // Bu ikili daha önce oynamamış olsun
                );

                if (availableOpponents.length > 0) {
                    awayTeam = availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
                } else {
                    // Eğer uygun rakip bulunamazsa, daha önce oynamış ama bu hafta müsait olanlardan seç
                    const fallbackOpponents = allTeams.filter(team =>
                        team.id !== homeTeam.id &&
                        !teamsPlayingThisWeek.has(team.id)
                    );
                    if (fallbackOpponents.length > 0) {
                        awayTeam = fallbackOpponents[Math.floor(Math.random() * fallbackOpponents.length)];
                    }
                }

                if (awayTeam) {
                    matches.push({ homeTeamId: homeTeam.id, awayTeamId: awayTeam.id });
                    teamsPlayingThisWeek.add(homeTeam.id);
                    teamsPlayingThisWeek.add(awayTeam.id);
                    // Maç çiftini oynanmış olarak işaretle
                    playedPairsThisSeason.add(`${homeTeam.id}-${awayTeam.id}`);
                    playedPairsThisSeason.add(`${awayTeam.id}-${homeTeam.id}`);
                }
            }
            return matches;
        },

        /**
         * İki takım arasındaki bir maçı simüle eder ve skorları döndürür.
         * Takım güçleri ve ev sahibi avantajı dikkate alınır.
         * @param {Object} homeTeam - Ev sahibi takım objesi.
         * @param {Object} awayTeam - Deplasman takımı objesi.
         * @returns {{homeScore: number, awayScore: number}} Maç skorları.
         */
        simulateMatch: function(homeTeam, awayTeam) {
            const homeAdvantage = 5; // Ev sahibi takımın gücüne eklenen avantaj
            const homePower = homeTeam.power + homeAdvantage;
            const awayPower = awayTeam.power;

            let homeGoals = 0;
            let awayGoals = 0;

            // Maçta toplam 5 ile 8 arasında gol fırsatı olsun
            const totalGoalChances = Math.floor(Math.random() * 4) + 5; // 5, 6, 7, 8

            for (let i = 0; i < totalGoalChances; i++) {
                const randomChance = Math.random() * (homePower + awayPower);
                if (randomChance < homePower) {
                    homeGoals++;
                } else {
                    awayGoals++;
                }
            }

            // Maçın golsüz bitmesini engellemek için (isteğe bağlı)
            if (homeGoals === 0 && awayGoals === 0) {
                if (Math.random() < 0.5) homeGoals++;
                else awayGoals++;
            }

            // Güçlü takımın farkı açmasını sağlamak için (isteğe bağlı)
            const powerDiff = homePower - awayPower;
            if (powerDiff > 15) { // Ev sahibi çok güçlüyse
                homeGoals += Math.floor(Math.random() * 2); // 0 veya 1 gol daha
            } else if (powerDiff < -15) { // Deplasman takımı çok güçlüyse
                awayGoals += Math.floor(Math.random() * 2);
            }

            return { homeScore: homeGoals, awayScore: awayGoals };
        },

        /**
         * Bir takımın gücünü, oyuncularının ortalama gücüne göre yeniden hesaplar.
         * @param {Object} team - Gücü güncellenecek takım objesi.
         */
        updateTeamPower: function(team) {
            const teamPlayers = this.playersData.filter(player => player.teamId === team.id);
            if (teamPlayers.length === 0) {
                team.power = 0;
                return;
            }
            const totalPower = teamPlayers.reduce((sum, player) => sum + player.power, 0);
            team.power = Math.round(totalPower / teamPlayers.length);
        },

        /**
         * Takımların güçlerini lig performanslarına göre ayarlar.
         * İyi performans gösteren takımların gücü artar, kötü performans gösterenlerin azalır.
         */
        updateTeamPowersBasedOnPerformance: function() {
            // Takımları puanlarına göre sıralayarak güncel sıralamayı al
            const sortedTeams = [...this.teamsData].sort((a, b) => b.points - a.points);

            this.teamsData.forEach(team => {
                const currentRank = sortedTeams.findIndex(t => t.id === team.id); // Mevcut sıralama (0 tabanlı)
                const pointsPerGame = team.played > 0 ? team.points / team.played : 0;

                let powerChange = 0;
                // Performansa göre temel güç değişimi
                if (pointsPerGame >= 2.5) { // Çok iyi performans (ortalama 2.5 puan/maç)
                    powerChange = Math.floor(Math.random() * 2) + 1; // +1 veya +2
                } else if (pointsPerGame >= 1.5) { // İyi performans
                    powerChange = Math.floor(Math.random() * 2); // 0 veya +1
                } else if (pointsPerGame < 1) { // Kötü performans
                    powerChange = - (Math.floor(Math.random() * 2) + 1); // -1 veya -2
                } else { // Orta performans
                    powerChange = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
                }

                // Sıralamaya göre ek bonus/ceza
                if (currentRank < 3) powerChange += 1; // İlk 3'e ek bonus
                else if (currentRank >= this.teamsData.length - 3) powerChange -= 1; // Son 3'e ek ceza

                // Gücü 60-99 arasında tut
                team.power = Math.max(60, Math.min(99, team.power + powerChange));
            });
        },

        /**
         * Oyuncuların değerlerini günceller (güçlerine göre).
         */
        updatePlayerValues: function() {
            this.playersData.forEach(player => {
                // Oyuncunun gücüne göre değerini güncelle (rastgele bir sapma ile)
                player.value = player.power * 10000 + Math.floor(Math.random() * 50000);
            });
        },

        /**
         * Transfer pazarını yeniler, yeni oyuncuları listeye ekler.
         */
        refreshTransferMarket: function() {
            this.transferMarket = []; // Pazarı temizle
            // Rastgele 5-10 oyuncuyu pazara çıkar
            const shuffledPlayers = [...this.playersData].sort(() => 0.5 - Math.random());
            const numPlayersToMarket = Math.floor(Math.random() * 6) + 5; // 5 ile 10 arası oyuncu

            let addedCount = 0;
            for (let i = 0; i < shuffledPlayers.length && addedCount < numPlayersToMarket; i++) {
                const player = shuffledPlayers[i];
                // Kendi takımımın oyuncusu değilse ve zaten transferde değilse pazara ekle
                if (player.teamId !== this.myTeamId && !player.isTransferable) {
                    player.isTransferable = true;
                    // Transfer ücretini oyuncunun değerinin %80-120'si arasında belirle
                    player.transferFee = Math.round(player.value * (0.8 + Math.random() * 0.4));
                    this.transferMarket.push(player);
                    addedCount++;
                }
            }
        },

        /**
         * Oyuncuyu kendi takımından satar.
         * @param {string} playerId - Satılacak oyuncunun ID'si.
         */
        sellPlayer: function(playerId) {
            const myTeam = this.teamsData.find(team => team.id === this.myTeamId);
            const playerIndex = this.playersData.findIndex(p => p.id === playerId && p.teamId === this.myTeamId);

            if (playerIndex > -1 && myTeam) {
                const player = this.playersData[playerIndex];
                // Takımda en az 11 oyuncu kalmalı kontrolü
                if (this.playersData.filter(p => p.teamId === myTeam.id).length <= 11) {
                    this.showMessage('Hata', 'Takımınızda en az 11 oyuncu bulunmalıdır.', 'warning');
                    return;
                }

                myTeam.budget += player.value; // Oyuncunun değerini bütçeye ekle
                this.newsFeed.push({
                    week: this.currentWeek,
                    message: `${myTeam.name}, ${player.name} adlı oyuncuyu ${this.formatCurrency(player.value)} karşılığında sattı.`
                });
                this.playersData.splice(playerIndex, 1); // Oyuncuyu veriden sil

                this.updateTeamPower(myTeam); // Takım gücünü güncelle
                this.saveData();
                this.renderUI();
                this.showMessage('Başarılı', `${player.name} başarıyla satıldı!`, 'success');
            } else {
                this.showMessage('Hata', 'Oyuncu bulunamadı veya takımınızda değil.', 'danger');
            }
        },

        /**
         * Transfer pazarından oyuncu satın alır.
         * @param {string} playerId - Satın alınacak oyuncunun ID'si.
         */
        buyPlayer: function(playerId) {
            const myTeam = this.teamsData.find(team => team.id === this.myTeamId);
            const player = this.transferMarket.find(p => p.id === playerId);

            if (myTeam && player) {
                if (player.transferFee > myTeam.budget) {
                    this.showMessage('Hata', 'Yetersiz bütçe!', 'danger');
                    return;
                }

                // Oyuncuyu mevcut takımından çıkar (eğer varsa)
                const oldTeam = this.teamsData.find(t => t.id === player.teamId);
                if (oldTeam && oldTeam.id !== myTeam.id) { // Eski takım benim takımım değilse
                    const oldTeamPlayerIndex = this.playersData.findIndex(p => p.id === playerId);
                    if (oldTeamPlayerIndex > -1) {
                        // Oyuncuyu eski takımın oyuncu listesinden çıkar (mantıksal olarak)
                        // veya sadece takım ID'sini değiştir. Burada takım ID'sini değiştiriyoruz.
                        this.playersData[oldTeamPlayerIndex].teamId = myTeam.id;
                        this.updateTeamPower(oldTeam); // Eski takımın gücünü güncelle
                    }
                }

                myTeam.budget -= player.transferFee; // Bütçeden düş
                player.teamId = myTeam.id; // Oyuncunun takımını benim takımım olarak ayarla
                player.isTransferable = false; // Transfer pazarından çıkar
                player.transferFee = 0; // Transfer ücretini sıfırla

                this.newsFeed.push({
                    week: this.currentWeek,
                    message: `${myTeam.name}, ${player.name} adlı oyuncuyu ${this.formatCurrency(player.transferFee)} karşılığında transfer etti.`
                });

                this.updateTeamPower(myTeam); // Benim takımımın gücünü güncelle
                this.refreshTransferMarket(); // Transfer pazarını yenile (satın alınan oyuncu listeden çıksın)
                this.saveData();
                this.renderUI();
                this.showMessage('Başarılı', `${player.name} transfer edildi!`, 'success');
            } else {
                this.showMessage('Hata', 'Oyuncu transfer pazarında bulunamadı veya bir hata oluştu.', 'danger');
            }
        },

        /**
         * Takım düzenleme modalını açar ve mevcut takım bilgilerini yükler.
         */
        openTeamEditorModal: function() {
            const myTeam = this.teamsData.find(team => team.id === this.myTeamId);
            if (!myTeam) {
                this.showMessage('Hata', 'Takımınızı düzenlemek için önce bir takım seçmelisiniz!', 'danger');
                return;
            }

            document.getElementById('editTeamName').value = myTeam.name;

            const playerEditList = document.getElementById('team-editor-player-list');
            playerEditList.innerHTML = '';

            const myTeamPlayers = this.playersData.filter(player => player.teamId === myTeam.id);
            myTeamPlayers.forEach(player => {
                const playerItem = document.createElement('div');
                playerItem.classList.add('team-editor-item');
                playerItem.innerHTML = `
                    <label for="player-name-${player.id}">Oyuncu Adı:</label>
                    <input type="text" id="player-name-${player.id}" value="${player.name}" class="form-control">
                    <label for="player-power-${player.id}">Güç:</label>
                    <input type="number" id="player-power-${player.id}" value="${player.power}" min="60" max="99" class="form-control">
                    <label for="player-salary-${player.id}">Maaş:</label>
                    <input type="number" id="player-salary-${player.id}" value="${player.salary}" min="10000" class="form-control">
                `;
                playerEditList.appendChild(playerItem);
            });

            document.getElementById('team-editor-modal').style.display = 'flex';
        },

        /**
         * Takım düzenleme modalındaki değişiklikleri kaydeder.
         */
        saveMyTeamChanges: function() {
            const myTeam = this.teamsData.find(team => team.id === this.myTeamId);
            if (!myTeam) return;

            myTeam.name = document.getElementById('editTeamName').value;

            this.playersData.filter(player => player.teamId === myTeam.id).forEach(player => {
                const nameInput = document.getElementById(`player-name-${player.id}`);
                const powerInput = document.getElementById(`player-power-${player.id}`);
                const salaryInput = document.getElementById(`player-salary-${player.id}`);

                if (nameInput) player.name = nameInput.value;
                // Güç ve maaş değerlerini sayıya çevir ve geçerli aralıkta tut
                if (powerInput) player.power = Math.max(60, Math.min(99, parseInt(powerInput.value)));
                if (salaryInput) player.salary = Math.max(10000, parseInt(salaryInput.value));

                // Güç değişince değerini güncelle
                player.value = player.power * 10000 + Math.floor(Math.random() * 50000);
            });

            this.updateTeamPower(myTeam); // Takım gücünü yeniden hesapla
            this.saveData();
            this.renderUI();
            this.closeTeamEditorModal();
            this.showMessage('Başarılı', 'Takım ve oyuncu bilgileri güncellendi.', 'success');
        },

        /**
         * Takım düzenleme modalını kapatır.
         */
        closeTeamEditorModal: function() {
            document.getElementById('team-editor-modal').style.display = 'none';
        },

        /**
         * Oyuncu detayları düzenleme modalını açar.
         * @param {string} playerId - Düzenlenecek oyuncunun ID'si.
         */
        openEditPlayerModal: function(playerId) {
            const player = this.playersData.find(p => p.id === playerId);
            if (!player) {
                this.showMessage('Hata', 'Oyuncu bulunamadı.', 'danger');
                return;
            }

            document.getElementById('editPlayerId').value = player.id;
            document.getElementById('editPlayerName').value = player.name;
            document.getElementById('editPlayerPosition').value = player.position;
            document.getElementById('editPlayerPower').value = player.power;
            document.getElementById('editPlayerSalary').value = player.salary;

            document.getElementById('player-details-modal').style.display = 'flex';
        },

        /**
         * Oyuncu detayları modalındaki değişiklikleri kaydeder.
         */
        savePlayerChanges: function() {
            const playerId = document.getElementById('editPlayerId').value;
            const player = this.playersData.find(p => p.id === playerId);

            if (player) {
                player.name = document.getElementById('editPlayerName').value;
                player.position = document.getElementById('editPlayerPosition').value;
                player.power = Math.max(60, Math.min(99, parseInt(document.getElementById('editPlayerPower').value)));
                player.salary = Math.max(10000, parseInt(document.getElementById('editPlayerSalary').value));

                player.value = player.power * 10000 + Math.floor(Math.random() * 50000); // Değeri yeniden hesapla

                const myTeam = this.teamsData.find(team => team.id === this.myTeamId);
                this.updateTeamPower(myTeam); // Takım gücünü güncelle

                this.saveData();
                this.renderUI();
                this.closeEditPlayerModal();
                this.showMessage('Başarılı', 'Oyuncu bilgileri güncellendi.', 'success');
            } else {
                this.showMessage('Hata', 'Oyuncu bulunamadı.', 'danger');
            }
        },

        /**
         * Oyuncu detayları modalını kapatır.
         */
        closeEditPlayerModal: function() {
            document.getElementById('player-details-modal').style.display = 'none';
        },

        /**
         * Oyunun mevcut durumunu localStorage'a kaydeder.
         */
        saveData: function() {
            try {
                localStorage.setItem('gflGameState', JSON.stringify({
                    currentWeek: this.currentWeek,
                    teamsData: this.teamsData,
                    playersData: this.playersData,
                    matchResults: this.matchResults,
                    transferMarket: this.transferMarket,
                    newsFeed: this.newsFeed,
                    myTeamId: this.myTeamId,
                    coachName: this.coachName, // Teknik direktör adını kaydet
                    pastSeasons: this.pastSeasons // Geçmiş sezonları kaydet
                }));
                console.log('Oyun verileri kaydedildi.');
            } catch (e) {
                console.error('Veri kaydedilirken hata oluştu:', e);
                this.showMessage('Hata', 'Oyun verileri kaydedilemedi. Tarayıcı depolama alanı dolu olabilir.', 'danger');
            }
        },

        /**
         * Oyunun durumunu localStorage'dan yükler.
         * @returns {boolean} Veri başarıyla yüklendiyse true, aksi takdirde false.
         */
        loadData: function() {
            try {
                const savedState = localStorage.getItem('gflGameState');
                if (savedState) {
                    const parsedState = JSON.parse(savedState);
                    this.currentWeek = parsedState.currentWeek || 1;
                    this.teamsData = parsedState.teamsData || [];
                    this.playersData = parsedState.playersData || [];
                    this.matchResults = parsedState.matchResults || [];
                    this.transferMarket = parsedState.transferMarket || [];
                    this.newsFeed = parsedState.newsFeed || [];
                    this.myTeamId = parsedState.myTeamId || null; // Null olabilir
                    this.coachName = parsedState.coachName || 'Teknik Direktör'; // Yükle veya varsayılan
                    this.pastSeasons = parsedState.pastSeasons || []; // Geçmiş sezonları yükle

                    // Yüklenen verilerin geçerli olup olmadığını kontrol et
                    if (this.teamsData.length === 0 || this.playersData.length === 0) {
                        console.warn('Yüklenen veriler eksik veya bozuk, yeni veri oluşturuluyor.');
                        return false; // Veri eksikse yeni veri oluşturulması için false döndür
                    }
                    console.log('Oyun verileri yüklendi.');
                    return true;
                }
            } catch (e) {
                console.error('Veri yüklenirken hata oluştu veya bozuk veri:', e);
                this.showMessage('Hata', 'Kayıtlı oyun verileri yüklenemedi. Yeni bir oyun başlatılıyor.', 'danger');
            }
            return false;
        },

        /**
         * Oyunu sıfırlar ve yeni bir oyun başlatır.
         */
        resetGame: function() {
            // Kullanıcıdan onay al
            const confirmReset = document.getElementById('confirm-modal');
            document.getElementById('confirm-modal-title').textContent = 'Oyunu Sıfırla';
            document.getElementById('confirm-modal-text').textContent = 'Emin misiniz? Tüm ilerlemeniz silinecek ve yeni bir oyun başlayacak.';
            document.getElementById('confirm-yes-button').onclick = () => {
                localStorage.removeItem('gflGameState'); // Kayıtlı veriyi sil
                this.initializeData(); // Yeni başlangıç verileri oluştur
                this.saveData(); // Yeni veriyi kaydet
                this.renderUI(); // Arayüzü yeniden çiz
                this.showMessage('Oyun Sıfırlandı', 'Yeni bir oyun başlatıldı.', 'info');
                document.getElementById('simulate-week-button').disabled = false; // Simülasyon butonunu etkinleştir
                confirmReset.style.display = 'none'; // Modalı kapat
                this.showStartGameModal(); // Takım seçimi modalını göster
            };
            document.getElementById('confirm-no-button').onclick = () => {
                confirmReset.style.display = 'none';
            };
            confirmReset.style.display = 'flex';
        },

        /**
         * Yeni oyun başlatma modalını gösterir ve takım seçeneklerini doldurur.
         */
        showStartGameModal: function() {
            const startGameModal = document.getElementById('start-game-modal');
            const myTeamSelect = document.getElementById('myTeamSelect');
            myTeamSelect.innerHTML = ''; // Önceki seçenekleri temizle

            // Takım seçeneklerini doldur
            this.teamsData.forEach(team => {
                const option = document.createElement('option');
                option.value = team.id;
                option.textContent = team.name;
                myTeamSelect.appendChild(option);
            });

            // Eğer kaydedilmiş bir takım varsa, onu seçili getir
            if (this.myTeamId) {
                myTeamSelect.value = this.myTeamId;
            }
            // Teknik direktör adını doldur
            document.getElementById('coachNameInput').value = this.coachName === 'Teknik Direktör' ? '' : this.coachName;

            startGameModal.style.display = 'flex';
        },

        /**
         * Yeni oyunu başlatır, seçilen takım ve teknik direktör adını kaydeder.
         */
        startGame: function() {
            const coachName = document.getElementById('coachNameInput').value.trim();
            const selectedTeamId = document.getElementById('myTeamSelect').value;

            if (!coachName) {
                this.showMessage('Hata', 'Lütfen teknik direktör adınızı girin!', 'danger');
                return;
            }
            if (!selectedTeamId) {
                this.showMessage('Hata', 'Lütfen bir takım seçin!', 'danger');
                return;
            }

            this.coachName = coachName;
            this.myTeamId = selectedTeamId;

            // Eğer yeni bir oyun başlatılıyorsa (yani veri yoksa veya sıfırlandıysa)
            // initializeData zaten çağrılmış olmalı. Sadece myTeamId ve coachName'i ayarla.
            // Eğer mevcut bir oyun yüklenmişse ve sadece takım/td değiştirmek isteniyorsa,
            // bu fonksiyon zaten loadData'dan sonra çağrılmamalı.
            // Bu fonksiyon genellikle sadece ilk başlangıçta veya reset sonrası çağrılmalı.

            document.getElementById('start-game-modal').style.display = 'none';
            this.saveData(); // Yeni seçilen bilgileri kaydet
            this.renderUI(); // Arayüzü güncelle
            this.showMessage('Oyun Başladı!', `${this.coachName} olarak ${this.teamsData.find(t => t.id === this.myTeamId).name} takımını yönetiyorsunuz!`, 'success');
        },

        /**
         * Para birimi formatında çıktı verir.
         * @param {number} amount - Formatlanacak miktar.
         * @returns {string} Formatlanmış para birimi dizesi.
         */
        formatCurrency: function(amount) {
            return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(amount);
        },

        /**
         * Kullanıcıya mesaj kutusu gösterir.
         * @param {string} title - Mesaj kutusunun başlığı.
         * @param {string} message - Mesaj metni.
         * @param {string} type - Mesaj tipi (info, success, warning, danger).
         */
        showMessage: function(title, message, type = 'info') {
            const messageBox = document.getElementById('message-box');
            const messageTitle = document.getElementById('message-title');
            const messageText = document.getElementById('message-text');

            messageTitle.textContent = title;
            messageText.textContent = message;

            messageBox.className = 'message-box'; // Tüm sınıfları sıfırla
            messageBox.classList.add(`message-box-${type}`); // Mesaj tipine göre sınıf ekle
            messageBox.style.display = 'flex'; // Mesaj kutusunu göster

            setTimeout(() => {
                messageBox.style.display = 'none'; // 5 saniye sonra kapat
            }, 5000);
        },

        /**
         * Takım güçlerini gösteren Chart.js grafiğini günceller.
         */
        updateChart: function() {
            const ctx = document.getElementById('teamPowerChart').getContext('2d');
            if (this.teamPowerChart) {
                this.teamPowerChart.destroy(); // Önceki grafiği yok et
            }

            // Takımları güce göre azalan sırada sırala
            const sortedTeams = [...this.teamsData].sort((a, b) => b.power - a.power);
            const labels = sortedTeams.map(team => team.name);
            const data = sortedTeams.map(team => team.power);

            this.teamPowerChart = new Chart(ctx, {
                type: 'bar', // Çubuk grafik
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Takım Gücü',
                        data: data,
                        // Benim takımımın çubuğunu farklı renkte göster
                        backgroundColor: sortedTeams.map(team => team.id === this.myTeamId ? 'rgba(26, 86, 219, 0.8)' : 'rgba(75, 192, 192, 0.6)'),
                        borderColor: sortedTeams.map(team => team.id === this.myTeamId ? 'rgba(26, 86, 219, 1)' : 'rgba(75, 192, 192, 1)'),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Konteyner boyutuna uyum sağla
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100 // Güç değeri 100'ü geçmez
                        }
                    },
                    plugins: {
                        legend: {
                            display: false // Efsaneyi gizle
                        },
                        title: {
                            display: true,
                            text: 'Takım Güçleri Sıralaması',
                            font: {
                                size: 16
                            }
                        }
                    }
                }
            });
        },

        /**
         * Tüm olay dinleyicilerini (buton tıklamaları, navigasyon) ayarlar.
         */
        setupEventListeners: function() {
            // Sidebar Navigasyon Butonları
            document.querySelectorAll('.nav-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    // Tüm navigasyon butonlarından 'active' sınıfını kaldır
                    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
                    // Tıklanan butona 'active' sınıfını ekle
                    e.currentTarget.classList.add('active');
                    // Tüm içerik bölümlerini gizle
                    document.querySelectorAll('.content-section').forEach(section => section.style.display = 'none');
                    // Tıklanan butonun hedeflediği içerik bölümünü göster
                    document.getElementById(e.currentTarget.dataset.target).style.display = 'block';
                    Game.renderUI(); // Her sekme değişiminde UI'ı güncelle
                });
            });

            // Maç Simülasyon Butonu
            document.getElementById('simulate-week-button').addEventListener('click', () => {
                Game.simulateNextWeek();
            });

            // Benim Takımımı Düzenle Butonu
            document.getElementById('edit-my-team-button').addEventListener('click', () => {
                Game.openTeamEditorModal();
            });

            // Modal Kapatma Butonları (Tüm modallar için geçerli)
            document.querySelectorAll('.close-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.target.closest('.modal').style.display = 'none';
                });
            });

            // Takım Düzenleme Modal Kaydet Butonu
            document.getElementById('save-team-changes-button').addEventListener('click', () => {
                Game.saveMyTeamChanges();
            });

            // Oyuncu Detayları Modal Kaydet Butonu
            document.getElementById('save-player-changes-button').addEventListener('click', () => {
                Game.savePlayerChanges();
            });

            // Yeni Oyun Başlat Butonu (Sidebar'daki)
            document.getElementById('reset-game-button').addEventListener('click', () => {
                Game.resetGame();
            });

            // Transfer Pazarında Güç Filtreleme
            document.getElementById('transfer-power-filter').addEventListener('input', (e) => { // 'change' yerine 'input' kullandık
                document.getElementById('transfer-power-display').textContent = e.target.value; // Değeri anında göster
                const minPower = parseInt(e.target.value);
                const teamId = document.getElementById('transfer-team-filter').value;
                let filteredPlayers = Game.transferMarket;
                if (teamId !== 'all') {
                    filteredPlayers = filteredPlayers.filter(p => p.teamId === teamId);
                }
                filteredPlayers = filteredPlayers.filter(p => p.power >= minPower);
                Game.renderTransferMarket(filteredPlayers); // Filtrelenmiş oyuncuları render et
            });


            // Transfer Pazarında Takım Filtreleme
            document.getElementById('transfer-team-filter').addEventListener('change', (e) => {
                const teamId = e.target.value;
                const minPower = parseInt(document.getElementById('transfer-power-filter').value);
                let filteredPlayers = Game.transferMarket;
                if (teamId !== 'all') {
                    filteredPlayers = filteredPlayers.filter(p => p.teamId === teamId);
                }
                filteredPlayers = filteredPlayers.filter(p => p.power >= minPower);

                Game.renderTransferMarket(filteredPlayers); // Filtrelenmiş oyuncuları render et
            });

            // Oyun Editörü Kaydet Butonu
            document.getElementById('save-editor-changes-button').addEventListener('click', () => {
                Game.saveEditorChanges();
            });

            // Oyun Editörü İptal Butonu
            document.getElementById('cancel-editor-changes-button').addEventListener('click', () => {
                Game.cancelEditorChanges();
            });

            // Oyun Editörü Oyuncu Filtreleri
            document.getElementById('editor-team-filter').addEventListener('change', () => {
                Game.filterAndRenderEditorPlayers();
            });
            document.getElementById('editor-player-name-filter').addEventListener('input', () => {
                Game.filterAndRenderEditorPlayers();
            });

            // Oyun Başlatma Modalı Butonu
            document.getElementById('start-new-game-button').addEventListener('click', () => {
                Game.startGame();
            });
        },

        /**
         * Oyunun başlangıç kurulumunu yapar (veri yükleme, olay dinleyicileri, UI render).
         */
        init: function() {
            // Kayıtlı veri varsa yükle
            if (this.loadData()) {
                // Eğer takım seçimi yapılmamışsa (ilk yüklemede veya reset sonrası)
                if (this.myTeamId === null) {
                    this.showStartGameModal();
                } else {
                    this.renderUI(); // Arayüzü ilk kez çiz
                }
            } else {
                // Kayıtlı veri yoksa, yeni veri oluştur ve başlangıç modalını göster
                this.initializeData();
                this.showStartGameModal();
            }

            this.setupEventListeners(); // Olay dinleyicilerini ayarla

            // Maç simülasyonu butonu için ligin bitip bitmediğini kontrol et
            if (this.currentWeek > this.totalWeeks) {
                document.getElementById('simulate-week-button').disabled = true;
            }

            // Transfer takım filtresi seçeneklerini doldur (sadece bir kez)
            const transferTeamFilterSelect = document.getElementById('transfer-team-filter');
            // Mevcut seçenekleri temizle (eğer daha önce doldurulmuşsa)
            transferTeamFilterSelect.innerHTML = '<option value="all">Tüm Takımlar</option>';
            this.teamsData.forEach(team => {
                const option = document.createElement('option');
                option.value = team.id;
                option.textContent = team.name;
                transferTeamFilterSelect.appendChild(option);
            });
        }
    };

    // Oyun başlatma
    Game.init();
});
