<template>
     <div class="container">
        <h1>Личный кабинет</h1>
        <div class="profile-info">
            <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="Avatar">
            <h2>Имя пользователя{{content.username}}</h2>
        </div>
        <div class="tabs">
            <button class="tab active">Мои обращения</button>
            <button class="tab">Избранное</button>
            <button class="tab">Настройки профиля</button>
        </div>
        <div class="content">
            <div class="orders">
                <div class="order">
                    <h3>Заказ 1</h3>
                    <EventList></EventList>
                    <p>Дата заказа: 01.01.2021</p>
                    <p>Статус: Выполнен</p>
                </div>
                <div class="order">
                    <h3>Заказ 2</h3>
                    <EventList></EventList>
                    <p>Дата заказа: 01.02.2021</p>
                    <p>Статус: В процессе</p>
                </div>
                <div class="order">
                    <h3>Заказ 3</h3>
                    <p>Дата заказа: 01.03.2021</p>
                    <p>Статус: Отменен</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 import EventList from '../components/EventList.vue';
export default {
    components: {
      EventList, 
    },
}
</script>

    <style>
        /* Стили для страницы личного кабинета */
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            text-align: center;
        }
        .profile-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 40px;
        }
        .profile-info img {
            width: 200px;
            height: 200px;
            border-radius: 50%;
        }
        .profile-info h2 {
            font-size: 28px;
            font-weight: bold;
            margin-left: 20px;
        }
        .tabs {
            margin-top: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .tab {
            padding: 10px 20px;
            font-size: 20px;
            font-weight: bold;
            color: #999;
            border: none;
            background-color: transparent;
            cursor: pointer;
        }
        .active {
            color: #000;
            border-bottom: 2px solid #000;
        }
        .content {
            margin-top: 40px;
        }
        .orders {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .order {
            width: 30%;
            margin-bottom: 40px;
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .order p {
            margin-bottom: 10px;
        }
    </style>

    