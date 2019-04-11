import Achievement from './models/achievement';
import Adventure from './models/adventure';
import Tag from './models/tag';

async function fillDataBase() {
    // Создание тегов
    const magicTag = await Tag.create({nameRu: 'магия', nameEn: 'magic'});
    const fantasyTag = await Tag.create({nameRu: 'фэнтези', nameEn: 'fantasy'});
    const teamTag = await Tag.create({nameRu: 'партийный', nameEn: 'team'});
    const dramaticTag = await Tag.create({nameRu: 'драма', nameEn: 'drama'});

    // Создание ачивок
    const sweetHomeAch = await Achievement.create({name: 'Дом, милый дом', image: 'https://db4sgowjqfwig.cloudfront.net/campaigns/208849/assets/918490/Village_Solvendiere.jpg?1542231765'});
    const sadEndAch = await Achievement.create({name: 'Печальный конец', image: 'https://50mm.ru/images/karez/26_karez.jpg'});
    const failAch = await Achievement.create({name: 'Неловко вышло...', image: 'https://pp.userapi.com/c840238/v840238485/838f2/nQTek6kkekc.jpg'});

    const imgPositions = {
        rightUp: 'right-up',
        leftUp: 'left-up',
        leftDown: 'left-down',
        rightDown: 'right-down'
    };
    // Приключение 1
    const bigEvilAdv = await Adventure.create({
        name: 'Великое Зло',
        description: 'Великое Зло пробудилось на севере. Верховный волшебник попросил вас отправиться туда и выяснить, насколько всё плохо.',
        image: 'https://img3.goodfon.ru/original/1920x1080/0/35/art-tiran-svita-tron.jpg'
    });
    await bigEvilAdv.addTags([magicTag, fantasyTag]);
    const firstSceneBigEvil = await bigEvilAdv.addScene({
        description: 'Ты отправляешься в Северные Пустоши. Как ты туда доберешься?',
        image: 'https://look.com.ua/pic/201507/2560x1440/look.com.ua-122914.jpg',
        position: imgPositions.leftDown
    });
    await bigEvilAdv.setFirstScene(firstSceneBigEvil);
    const secondSceneBigEvil = await bigEvilAdv.addScene({
        description: 'Вернуться домой и продолжить жить обычной жизнью - хорошая идея. Но через пару месяцев твою деревню сожгли северные орки...',
        image: 'http://bo32.ru/includes/upload/news/bo-1535035676.jpg',
        position: imgPositions.rightUp
    });
    await firstSceneBigEvil.addAction({name: 'Развернуться и пойти домой', target: secondSceneBigEvil});
    await secondSceneBigEvil.addAchievements([sweetHomeAch]);

    // Await firstSceneBigEvil.addAction({ name: 'Развернуться и пойти домой', target: firstSceneBigEvil });

    const beSoonSceneDescriptor = {
        description: 'Скоро здесь будет приключение!'
    };

    // Приключение 2
    const thiefGuildAdv = await Adventure.create({
        name: 'Просьба гильдии воров',
        description: 'Глава гильдии воров Доня приглашает всех желающих в свое логово. Говорят, он собирается назначить награду за чью-то голову.',
        image: 'https://i.pinimg.com/originals/16/e0/0a/16e00a052977ed757fceb40b9abf81de.jpg'
    });
    await thiefGuildAdv.addTags([fantasyTag, dramaticTag, teamTag]);
    const firstSceneTG = await thiefGuildAdv.addScene({
        description: 'Ты прибыл в логово Дони - главы гильдии воров в Екатерифтене. Перед тобой стоят два бугая. Они спрашивают: зачем пришел?',
        image: 'https://avatars.mds.yandex.net/get-pdb/467038/87d63117-7487-4a9e-ae95-408a590edb76/s1200',
        position: imgPositions.rightUp
    });
    const secondSceneTG = await thiefGuildAdv.addScene({
        description: 'Охрана пропускает тебя. Войдя внутрь, ты удивился - для "логова" здесь слишком много дорогих вещей и изысканных картин. В центре зала собралась небольшая группа людей.',
        image: 'https://i.playground.ru/i/blog/181671/content/5wqkbfg0.jpg',
        position: imgPositions.rightDown
    });
    const homeSceneTG = await thiefGuildAdv.addScene({
        description: 'Вернувшись домой, ты понял, что поступил правильно: нечего связываться с бандюганами.',
        image: 'https://img1.goodfon.ru/original/4000x2400/d/49/dom-les-doroga-art-nebo.jpg',
        position: imgPositions.leftUp
    });
    homeSceneTG.addAchievements([sweetHomeAch]);
    await firstSceneTG.addAction({name: 'Извиниться и убежать', target: homeSceneTG});
    await firstSceneTG.addAction({name: 'Сказать, что ты пришел узнать о награде за голову', target: secondSceneTG});
    await secondSceneTG.addAction({name: 'Уйти домой', target: homeSceneTG});
    const thirdSceneTG = await thiefGuildAdv.addScene({
        description: 'Подойдя поближе, вы увидели Доню - он с хитрой улыбкой крутил в руках кинжал. Наконец он заговорил: награда объявлена за его бывшего товарища Мичу: тот украл у него большую часть сокровищ и ускакал на Донином коне неизвестно куда...',
        image: 'http://orig07.deviantart.net/05ce/f/2015/083/e/7/best_thief_in_the_kingdom_by_vongue-d8mxreu.jpg',
        position: imgPositions.leftDown
    });
    await secondSceneTG.addAction({name: 'Подойти поближе', target: thirdSceneTG});

    const finalSceneTG = await thiefGuildAdv.addScene({
        description: 'Не стоило тебе сюда приходить: ведь ты и есть Мича. После гулянки на украденное золото ты все позабыл... Тебя схватили и бросили в бездомную яму...',
        image: 'https://nsk.questcompass.ru/upload/2018-07-27_huge2_5b5ad50a7c0f6.jpg',
        position: imgPositions.leftDown
    });
    await finalSceneTG.addAchievements([sadEndAch, failAch]);

    await thirdSceneTG.addAction({name: 'Заподозрить неладное...', target: finalSceneTG});

    // Приключение 3
    const defaultAdv = await Adventure.create({
        name: 'Что-то кончается, что-то начинается...'
    });
    await defaultAdv.addScene(beSoonSceneDescriptor);
}

export default fillDataBase;
