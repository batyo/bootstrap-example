// 「選手一覧」ページを作成する
function createPlayerPage() {
    // 既にある id="content" の要素を削除する
    const content = document.getElementById("content");
    content.remove();
    // JSONファイルを取得する
    fetch("./data/playerData.json")
    .then(response => response.json())
    .then(json => {
        const content = document.createElement("div");
        content.setAttribute("id", "content");
        const hTag = document.createElement("h2");
        hTag.textContent = "選手一覧";
        const table = document.createElement("table");
        table.setAttribute("class", "table");
        const thead = document.createElement("thead");
        const theadTr = document.createElement("tr");
        const thNumber = document.createElement("th");
        const thName = document.createElement("th");
        let thPosition = document.createElement("th");
        thNumber.textContent = "背番号";
        thName.textContent = "名前";
        thPosition.textContent = "ポジション";
        const tbody = document.createElement("tbody");

        table.appendChild(thead);
        table.appendChild(tbody);
        thead.appendChild(theadTr);
        theadTr.appendChild(thNumber);
        theadTr.appendChild(thName);
        theadTr.appendChild(thPosition);

        // 選手情報を書き込み
        for (let i = 0; i < json["player"].length; i++) {
            const tbodyTr = document.createElement("tr");
            tbodyTr.setAttribute("id", i);
            tbodyTr.setAttribute("class", "player-table-tr");
            const tdNumber = document.createElement("td");
            const tdName = document.createElement("td");
            const tdPosition = document.createElement("td");

            tdNumber.textContent = json["player"][i]["number"];
            tdName.textContent = json["player"][i]["name"];
            tdPosition.textContent = json["player"][i]["position"];

            tbody.appendChild(tbodyTr);
            tbodyTr.appendChild(tdNumber);
            tbodyTr.appendChild(tdName);
            tbodyTr.appendChild(tdPosition);
        }

        document.getElementsByTagName("main")[0].appendChild(content);
        document.getElementById("content").appendChild(hTag);
        document.getElementById("content").appendChild(table);

        playerDetailPage();
    });
}

const pages = {
    profile: `
        <h2>クラブプロフィール</h2>
        <p>サンフレチェ広島は、広島県広島市に本拠地を置くJリーグ所属のフットボールクラブです。2012年、2013年、2015年にJ1リーグを優勝し、2022年にルヴァンカップを優勝している。</p>
    `
};

// ページを表示する
function showPage(pageName) {
    if (pageName === "players") {
        createPlayerPage();
        return;
    }
    document.getElementById('content').innerHTML = pages[pageName];
    // data-page 属性が status の場合はグラフを描画する
    if (pageName === 'stats') {
        createStatusPage();
    }
}

// グラフを描画する
function createStatusPage() {
    // id="content"削除
    const deleteContent = document.getElementById("content");
    deleteContent.remove();

    const content = document.createElement("div");
    const statusTitle = document.createElement("h2");
    const chartCanvas = document.createElement("canvas");
    const wrapScore = document.createElement("div");
    const goals = document.createElement("p");
    const againstGoals = document.createElement("p");

    content.setAttribute("id", "content");
    statusTitle.textContent = "2023年度成績";
    chartCanvas.setAttribute("id", "pointsChart");
    wrapScore.setAttribute("class", "mt-4");
    goals.textContent = "得点数: 42";
    againstGoals.textContent = "失点数: 28";

    document.getElementsByTagName("main")[0].appendChild(content);
    content.appendChild(statusTitle);
    content.appendChild(chartCanvas);
    content.appendChild(wrapScore);
    wrapScore.appendChild(goals);
    wrapScore.appendChild(againstGoals);

    const ctx = document.getElementById("pointsChart").getContext("2d"); // 2 次元の描画コンテキストを表す CanvasRenderingContext2D オブジェクトを作成
    // JSON データ取得しグラフを描画
    fetch("./data/matchData.json")
    .then(response => response.json())
    .then(json => {
        const match = json["match"];
        let labelData = []; // グラフに渡すx軸ラベル
        let data_point = []; // グラフに渡すデータ (勝ち点)
        let data_rank = []; // グラフに渡すデータ (順位)
        let currentPoint = 0; // 勝ち点
        for (let i = 0; i < match.length; i++) {
            currentPoint += match[i]["point"];
            labelData.push(match[i]["section"]);
            data_rank.push(match[i]["currentRank"]);
            data_point.push(currentPoint);
        }

        // Chart.js の Chart コンストラクタを使用して、新しいグラフオブジェクトを作成
        // 第一引数に先ほど取得したキャンバスコンテキスト、第二引数に設定オブジェクトを渡す
        new Chart(ctx, {
            type: "line", // 折れ線グラフ
            data: {
                labels: labelData, // x軸のラベル
                datasets: [{
                    label: "順位", // データセットの名前（凡例に表示）
                    data: data_rank, // 実際のデータポイント
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1, // 線の曲がり具合
                    yAxisID: "y_rank"
                },
                {
                    label: "勝ち点",
                    data: data_point,
                    borderColor: "rbg(255, 0, 0)",
                    tension: 0.1,
                    yAxisID: "y_point"
                }
            ]},
            options: {
                responsive: true, // グラフのサイズをコンテナに合わせて自動調整
                scales: {
                    y_rank: {
                        min: 1,
                        max: 18,
                        reverse: true, // 逆順
                        position: "left", // Y軸左
                        grid: {
                            display: false
                        }
                    },
                    y_point: {
                        beginAtZero: true,
                        position: "right",
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: "linear"
                }
            }
        });
    })
    .catch(error => console.error('エラーが発生しました:', error));
}

// 選手詳細表示
function playerDetailPage() {
    const players = document.querySelectorAll(".player-table-tr");
    players.forEach(player => {
        player.addEventListener("click", (e) => {
            // id="content"削除
            const content = document.getElementById("content");
            content.remove();

            // クリックした要素の親に設定されている id 属性を取得
            const parentOfClickElm = e.target.parentNode;
            const id = parentOfClickElm.getAttribute("id");
            
            fetch("./data/playerData.json")
            .then(response => response.json())
            .then(json => {
                let name = json["player"][id]["name"];
                let detail = json["player"][id]["detail"];
                let played = detail["played"];
                let goal = detail["goal"]["goal-count"];
                let assist = detail["assist"];

                const content = document.createElement("div");
                const pageRoute = document.createElement("p");
                const indexPageLink = document.createElement("a");
                const pageRouteText = document.createTextNode(" > 選手詳細");
                const indexPageLinkText = document.createTextNode("選手一覧");
                const h2_name = document.createElement("h2");
                const p_played = document.createElement("p");
                const p_goal = document.createElement("p");
                const p_assist = document.createElement("p");

                content.setAttribute("id", "content");
                indexPageLink.setAttribute("id", "page-route-guide");
                indexPageLink.setAttribute("href", "#");
                indexPageLink.setAttribute("onclick", "createPlayerPage()");
                h2_name.textContent = name;
                p_played.textContent = "出場試合数 : " + played;
                p_goal.textContent = "得点数 : " + goal;
                p_assist.textContent = "アシスト数 : " + assist;

                // 得点が無い場合はグラフは作成しない
                if (goal === 0) {
                    document.getElementsByTagName("main")[0].appendChild(content);
                    content.appendChild(pageRoute);
                    indexPageLink.appendChild(indexPageLinkText);
                    pageRoute.appendChild(indexPageLink);
                    pageRoute.appendChild(pageRouteText);
                    content.appendChild(h2_name);
                    content.appendChild(p_played);
                    content.appendChild(p_goal);
                    content.appendChild(p_assist);
                    return;
                }

                const b_title = document.createElement("b");
                const wrapChart = document.createElement("div");
                const p_shotType = document.createElement("p");
                const p_shotArea = document.createElement("p");
                b_title.textContent = "得点詳細";
                wrapChart.setAttribute("class", "wrap-chart");
                p_shotType.textContent = "パターン";
                p_shotArea.textContent = "エリア"

                // シュートパターン
                let rightFoot = detail["goal"]["shot-type"]["right"];
                let leftFoot = detail["goal"]["shot-type"]["left"];
                let head = detail["goal"]["shot-type"]["head"];

                // シュートエリア
                let insideArea = detail["goal"]["area"]["inside"];
                let outsideArea = detail["goal"]["area"]["outside"];

                const goalTypeCanvas = document.createElement("canvas");
                const goalAreaCanvas = document.createElement("canvas");
                goalTypeCanvas.setAttribute("id", "piesChart");
                goalAreaCanvas.setAttribute("id", "piesChart2");

                document.getElementsByTagName("main")[0].appendChild(content);
                content.appendChild(pageRoute);
                indexPageLink.appendChild(indexPageLinkText);
                pageRoute.appendChild(indexPageLink);
                pageRoute.appendChild(pageRouteText);
                content.appendChild(h2_name);
                content.appendChild(p_played);
                content.appendChild(p_goal);
                content.appendChild(p_assist);
                content.appendChild(b_title);
                content.appendChild(wrapChart);
                //wrapChart.appendChild(p_shotType)
                wrapChart.appendChild(goalTypeCanvas);
                //wrapChart.appendChild(p_shotArea);
                wrapChart.appendChild(goalAreaCanvas);

                const ctx = document.getElementById("piesChart").getContext("2d");
                const ctx2 = document.getElementById("piesChart2").getContext("2d");

                new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: ["右足", "左足", "頭"],
                        datasets: [{
                            data: [rightFoot, leftFoot, head],
                            backgroundColor : [
                                "rgb(255, 99, 132)",
                                "rgb(54, 162, 235)",
                                "rgb(255, 205, 86)"
                            ]
                        }]
                    },
                    options: {
                        responsive: false,
                        plugins: {
                            title: {
                                display: true,
                                text: "シュートパターン",
                                position: "top"
                            },
                            legend: {
                                position: "bottom" // 凡例の位置-底
                            }
                        }
                    }
                });

                new Chart(ctx2, {
                    type: "pie",
                    data: {
                        labels: ["エリア内", "エリア外"],
                        datasets: [{
                            data: [insideArea, outsideArea],
                            backgroundColor: [
                                "rgb(255, 99, 132)",
                                "rgb(54, 162, 235)"
                            ]
                        }]
                    },
                    options: {
                        responsive: false,
                        plugins: {
                            title: {
                                display: true,
                                text: "シュートエリア",
                                position: "top"
                            },
                            legend: {
                                position: "bottom"
                            }
                        }
                    }
                })
            })
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    // サイドバーのリンク取得
    const links = document.querySelectorAll('#sidebar .nav-link');
    links.forEach(link => {
        // サイドバーのリンク(「選手一覧」「成績」「プロフィール」)がクリックされた時
        link.addEventListener('click', (e) => {
            e.preventDefault();
            links.forEach(l => l.classList.remove('active')); // .active を削除
            link.classList.add('active'); // .active を追加

            // ドロップダウンメニュー選択の場合
            const linkId = link.getAttribute('id');
            if (linkId === 'dropdownMenu1') return;

            showPage(link.getAttribute('data-page')); // showPage(クリックされたリンクの data-page 属性)

            // モバイル表示時にサイドバーを閉じる
            if (window.innerWidth < 768) {
                sidebar.classList.remove('show');
            }
        });
    });

    showPage('players');
});