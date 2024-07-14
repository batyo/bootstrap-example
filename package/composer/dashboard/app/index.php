<?php require_once __DIR__ . '/vendor/autoload.php'; ?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>サンフレチェ広島 データ管理</title>
    <link href="./vendor/twbs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="./vendor/twbs/bootstrap-icons/font/bootstrap-icons.min.css" rel="stylesheet">
    <link href="./public/css/style.css" rel="stylesheet">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <!-- サイドバー -->
            <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column mt-4">
                        <li class="nav-item">
                            <a class="nav-link active" href="#" data-page="players">
                                <i class="bi bi-house-door me-2"></i>
                                選手一覧
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-page="stats">
                                <i class="bi bi-graph-up me-2"></i>
                                成績
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-page="profile">
                                <i class="bi bi-info-circle me-2"></i>
                                クラブプロフィール
                            </a>
                        </li>
                    </ul>
                </div>
                <hr>
                <div class="dropdown ps-3">
                    <a href="#" class="nav-link text-decoration-none dropdown-toggle" id="dropdownMenu1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots me-2"></i>
                        その他
                    </a>
                    <ul class="dropdown-menu ps-3" aria-labelledby="dropdownMenu1">
                        <li class="mt-2 mb-2"><a href="#" class="text-decoration-none"><i class="bi bi-plus-circle me-2"></i>新規作成</a></li>
                        <li class="mb-2"><a href="#" class="text-decoration-none"><i class="bi bi-gear me-2"></i>設定</a></li>
                    </ul>
                </div>
            </nav>

            <!-- メインコンテンツ -->
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <!-- ナビゲーションバー -->
                <nav class="navbar navbar-expand-md navbar-light fixed-top bg-blueviolet">
                    <div class="container-fluid">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <a class="navbar-brand text-light" href="#">
                            <span class="d-none d-sm-inline">サンフレチェ広島 データ管理</span>
                            <span class="d-inline d-sm-none">サンフレチェ広島 データ</span>
                        </a>
                    </div>
                </nav>

                <!-- コンテンツ -->
                <div id="content" class="pt-5"></div>
            </main>
        </div>
    </div>

    <script src="./vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="./public/js/main.js"></script>
</body>
</html>