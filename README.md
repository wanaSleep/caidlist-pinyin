#  mìng líng zhù shǒu ID biǎo shēng chéng gōng jù 
##  jiǎn jiè 
 mìng líng zhù shǒu zuò zhě  [ProjectXero](https://github.com/XeroAlpha)  shǐ yòng cǐ gōng jù shēng chéng ID biǎo 。

[MCBEID biǎo ](https://ca.projectxero.top/idlist/)（[ cāng kù ](https://github.com/XeroAlpha/caidlistweb)） shì jī yú cǐ gōng jù de shù jù zhì zuò de kě lí xiàn shǐ yòng de ID biǎo chá xún wǎng zhàn 。

[MCBEID biǎo   zài xiàn sōu suǒ API](./backend/API.md)  shì jī yú cǐ gōng jù de shù jù zhì zuò de zài xiàn ID biǎo sōu suǒ jiē kǒu 。

 běn cāng kù zhōng bāo hán le yòng yú shēng chéng ID biǎo de yuán shǐ shù jù yǔ bù fēn dǎo chū shù jù ， qǐng cān jiàn [ mù lù jié gòu ](# mù lù jié gòu )。

 rú guǒ nín xī wàng shǐ yòng cǐ gōng jù shēng chéng tè dìng bǎn běn de shù jù ， qǐng cān jiàn  [ gōng zuò liú ](# gōng zuò liú )。

 rú guǒ nín xī wàng gǎi shàn cǐ gōng jù de shù jù zhōng de fān yì bù fēn ， qǐng cān jiàn  [ fān yì zhǐ nán ](./translation/README.md)。

 rú guǒ nín xī wàng shù jù zhōng bāo hán gēng duō de nèi róng huò bǎn běn ， huān yíng tí chū  Issue。

##  mù lù jié gòu 

###  yuán shǐ shù jù 

 yuán shǐ shù jù jūn cún chǔ zài  `version`  mù lù zhōng 。

`version/common`  mù lù xià cún chǔ le yǔ gōng zuò liú wú guān de shù jù 。

| lù jìng | nèi róng |
| - | - |
|`version/common/wiki/standardized_translation.json`|[Minecraft Wiki](https://zh.minecraft.wiki/w/Minecraft_Wiki:%E8%AF%91%E5%90%8D%E6%A0%87%E5%87%86%E5%8C%96)  yǔ  [ jī yán bǎn kāi fā Wiki](https://wiki.mcbe-dev.net/p/Minecraft%E5%9F%BA%E5%B2%A9%E7%89%88%E5%BC%80%E5%8F%91Wiki:%E8%AF%91%E5%90%8D%E6%A0%87%E5%87%86%E5%8C%96)  zhōng de biāo zhǔn yì míng biǎo 。|
|`version/java/lang.json`| zuì xīn Java bǎn （ hán kuài zhào ） de jiǎn tǐ zhōng wén yǔ yīng wén yǔ yán wén jiàn 。|
|`version/documentation/`| jī yán bǎn guān fāng nèi róng bāo wén dàng ， tí qǔ zì [ guān fāng shì lì nèi róng bāo cāng kù ](https://github.com/Mojang/bedrock-samples)。|
|`version/documentation/<edition>.json`| cóng duì yīng bǎn běn de wén dàng zhōng tí qǔ de shù jù 。|
|`version/documentation/<edition>/<name>.json`| wén dàng jiě xī chéng de  JSON。|

`version/<edition>`  mù lù xià cún chǔ le kě tōng guò  `data/config.js`  pèi zhì bǎn běn de xiāng guān shù jù 。

| lù jìng | nèi róng |
| - | - |
|`version/<edition>/autocompletion/`| tōng guò sǎo miáo zì dòng bǔ quán liè biǎo huò qǔ de shù jù 。|
|`version/<edition>/autocompletion/<branch>.json`| zài duì yīng fēn zhī xià sǎo miáo zì dòng bǔ quán liè biǎo de jié guǒ 。|
|`version/<edition>/autocompletion/<branch>/<id>.json`| duì shàng yī tiáo de xì fēn 。|
|`version/<edition>/autocompletion/<branch>/mcpews.json`| tōng guò  [mcpews](https://github.com/mcpews/mcpews)  huò qǔ de shù jù 。|
|`version/<edition>/gametest/`| tōng guò  [quickjs-debugger](https://github.com/XeroAlpha/quickjs-debugger)  cóng  Script API  huò qǔ de shù jù 。|
|`version/<edition>/package/`| duì ān zhuāng bāo jìn háng jìng tài fēn xī suǒ huò dé de shù jù 。|
|`version/<edition>/package/info.json`|  ān zhuāng bāo de jī chǔ xìn xī 。|
|`version/<edition>/package/lang.json`|  ān zhuāng bāo de jiǎn tǐ zhōng wén yǔ yīng wén yǔ yán wén jiàn 。|
|`version/<edition>/package/data.json`|  duì ān zhuāng bāo de nèi zhì nèi róng bāo jìn háng fēn xī suǒ huò dé de shù jù 。|

###  dǎo chū shù jù 

 dǎo chū shù jù jūn cún chǔ zài  `output`  mù lù zhōng 。

| lù jìng | nèi róng |
| - | - |
|`output/clib/<edition>/<branch>.json`| duì yīng fēn zhī de mìng líng kù 。|
|`output/clib/<edition>/patch/<branch>.json`| duì yīng fēn zhī zài yuán bǎn fēn zhī jī chǔ shàng de zēng liáng mìng líng kù 。|
|`output/langParity/<edition>/difference.json`| liè chū tóng yī gè yīng wén zài Java bǎn yǔ jī yán bǎn duì yīng de bù tóng yīng wén 。|
|`output/langParity/<edition>/output.lang`| jī yú shàng shù fēn xī zhì zuò de yì míng xiū zhèng yǔ yán wén jiàn 。|
|`output/langParity/<edition>/output.mcpack`| jī yú shàng shù fēn xī zhì zuò de yì míng xiū zhèng yǔ yán bāo 。|
|`output/translation/<edition>/<branch>.json`| liè chū duì yīng fēn zhī xià de fān yì zhuàng tài 。|
|`output/translation/<edition>/<branch>.xlsx`| liè chū duì yīng fēn zhī xià de fān yì zhuàng tài 。|
|`output/web/`|  yóu MCBEID biǎo yǔ zài xiàn sōu suǒ API shǐ yòng de shù jù 。|

###  fān yì 

 qǐng cān jiàn  [ fān yì zhǐ nán ](./translation/README.md)。

###  bǎn běn 

|`<edition>`| míng chēng | bèi zhù |
| - | - | - |
|beta| cè shì bǎn / yù lǎn bǎn | gēng xīn sù dù kuài ， bāo hán jiào duō bù wěn dìng de xīn tè xìng de bǎn běn 。|
|release| zhèng shì bǎn | gēng xīn sù dù màn ， xiàng suǒ yǒu rén kāi fàng de wěn dìng bǎn běn 。|
|netease| zhōng guó bǎn | yóu wǎng yì tuī chū de zhōng guó běn dì huà bǎn běn ， tōng cháng là hòu yú zhèng shì bǎn 。|
|netease_dev| zhōng guó bǎn cè shì bǎn | miàn xiàng zhōng guó bǎn kāi fā zhě kāi fàng de cè shì bǎn běn 。|
|education| jiào yù bǎn | wéi jiào shì shǐ yòng ér shè jì de jiào xué bǎn běn 。|
|preview_win| yù lǎn bǎn （Windows）|Windows 10/11  shàng de yù lǎn bǎn 。|
|bds_preview| zhuān yòng fú wù qì yù lǎn bǎn | yù lǎn bǎn de zhuān yòng fú wù qì bǎn běn 。|
|bds| zhuān yòng fú wù qì zhèng shì bǎn | zhèng shì bǎn de zhuān yòng fú wù qì bǎn běn 。|
|dev| yù lǎn bǎn kāi fā bǎn | tóng yù lǎn bǎn ， dàn bāo hán bù fēn kāi fā zhě dú yǒu gōng néng yǔ kāi fā zhōng de xīn gōng néng 。|
|release_dev| zhèng shì bǎn kāi fā bǎn | tóng zhèng shì bǎn ， dàn bāo hán bù fēn kāi fā zhě dú yǒu gōng néng yǔ kāi fā zhōng de xīn gōng néng 。|
|education_dev| jiào yù bǎn kāi fā bǎn | tóng jiào yù bǎn ， dàn bāo hán bù fēn kāi fā zhě dú yǒu gōng néng yǔ kāi fā zhōng de xīn gōng néng 。|
|bds_dev| zhuān yòng fú wù qì yù lǎn bǎn kāi fā bǎn | tóng zhuān yòng fú wù qì yù lǎn bǎn ， dàn bāo hán bù fēn kāi fā zhě dú yǒu gōng néng yǔ kāi fā zhōng de xīn gōng néng 。|
|bds_release_dev| zhuān yòng fú wù qì zhèng shì bǎn kāi fā bǎn | tóng zhuān yòng fú wù qì yù lǎn bǎn ， dàn bāo hán bù fēn kāi fā zhě dú yǒu gōng néng yǔ kāi fā zhōng de xīn gōng néng 。|

###  fēn zhī 

|`<branch>`| míng chēng | lèi xíng | bèi zhù |
| - | - | - | - |
|vanilla| yuán bǎn | zì dòng bǔ quán | shǐ yòng mò rèn shè zhì chuàng jiàn de shì jiè |
|education| jiào yù bǎn | zì dòng bǔ quán | qǐ yòng le jiào yù bǎn xuǎn xiàng hòu chuàng jiàn de shì jiè |
|experiment| shí yàn xìng wán fǎ | zì dòng bǔ quán | qǐ yòng le suǒ yǒu shí yàn xìng wán fǎ xuǎn xiàng hòu chuàng jiàn de shì jiè |
|gametest|Script API|Script API| qǐ yòng le jiào yù bǎn xuǎn xiàng yǔ suǒ yǒu shí yàn xìng wán fǎ xuǎn xiàng hòu chuàng jiàn de shì jiè <br>（ kāi fā bǎn zhōng xū yào dǎ kāi “ xiǎn shì suǒ yǒu mìng líng ”，Windows 10  bǎn shàng jǐn kāi qǐ “ cè shì bǎn  API” shí yàn xìng wán fǎ ）|
|translator| fān yì zhuān yòng | fān yì zhuān yòng | biāo zhǔn yì míng biǎo yǔ liǎng gè bǎn běn de shuāng yǔ yǔ yán wén jiàn |
|documentation| wén dàng | wén dàng | kāi fā zhě wén dàng zhōng chū xiàn de ID jí qí miáo shù |
|langParity| yì míng bǐ jiào | yǔ yán bāo xiū zhèng | bǐ jiào jī yán bǎn fān yì yǔ biāo zhǔn huà yì míng ， shēng chéng yǔ yán xiū zhèng bāo |

###  zì dòng bǔ quán 

|`<id>`| míng chēng | bèi zhù |
| - | - | - |
|blocks| fāng kuài | yòng yú  setblock、fill  děng mìng líng de fāng kuài  ID。|
|items| wù pǐn | yòng yú  give、clear  děng mìng líng de wù pǐn  ID。|
|entities| shí tǐ | yòng yú  type  xuǎn zé qì de shí tǐ  ID。|
|summonable_entities| kě zhào huàn shí tǐ | yòng yú  summon  mìng líng de shí tǐ  ID。|
|effects| zhuàng tài xiào guǒ | yòng yú  effect  mìng líng de zhuàng tài xiào guǒ  ID。|
|enchantments| mó zhòu | yòng yú  enchant  mìng líng de mó zhòu  ID。|
|gamerules| yóu xì guī zé | yòng yú  gamerule  mìng líng de yóu xì guī zé  ID。|
|locations| jié gòu | yòng yú  locate  mìng líng de jié gòu  ID。|
|biomes| shēng wù qún xì | yòng yú  locate  mìng líng de shēng wù qún xì  ID。|
|mobevents| shēng wù shì jiàn | yòng yú  mobevent  mìng líng de shēng wù shì jiàn  ID。|
|entity_slots| cáo wèi | yòng yú  replaceitem  mìng líng děng de cáo wèi  ID。|
|selectors| mù biāo xuǎn zé qì cān shù | yòng yú xuǎn zé shí tǐ shí zhǐ dìng tiáo jiàn 。|
|loot_tools| zhàn lì pǐn gōng jù biǎo | yòng yú  loot  mìng líng de gōng jù xuǎn xiàng 。|
|damage_causes| shāng hài lèi xíng | yòng yú  damage  mìng líng de shāng hài lèi xíng  ID。|
|item_with_aliases| wù pǐn | bāo hán bié míng ， kě yòng yú  give、clear  děng mìng líng 。|
|features_and_rules| dì wù yǔ dì wù guī zé | yòng yú  placefeature  mìng líng de dì wù  ID  hé dì wù guī zé  ID。|
|input_permissions| cāo zuò shū rù quán xiàn | yòng yú  inputpermission  mìng líng de shū rù quán xiàn  ID。|
|camera_presets| shè xiàng jī yù shè | yòng yú  camera  mìng líng de shè xiàng jī yù shè  ID。|
|recipes| pèi fāng | yòng yú  recipe  mìng líng de pèi fāng  ID。|
|hud_elements|HUD jiè miàn yuán sù | yòng yú  hud  mìng líng de jiè miàn yuán sù  ID。|
|abilities| néng lì | yòng yú jiào yù bǎn  ability  mìng líng de néng lì  ID。|
|options| xuǎn xiàng | jǐn kāi fā bǎn |
|particle_types| lì zǐ lèi xíng | jǐn kāi fā bǎn |
|features| dì wù | jǐn kāi fā bǎn |
|feature_rules| dì wù guī zé | jǐn kāi fā bǎn |
|server_tests| fú wù qì cè shì | jǐn kāi fā bǎn |
|unit_tests| dān yuán cè shì | jǐn kāi fā bǎn |
|functional_tests| gōng néng cè shì | jǐn kāi fā bǎn |

##  gōng zuò liú 
 qǐng shì qíng kuàng xuǎn zé gōng zuò liú 。

-  jǐn dǎo chū zì dài bǎn běn ： zhǔn bèi 、 yùn háng 、 xiào duì 
-  dǎo chū rèn yì bǎn běn ： zhǔn bèi 、 zhǔn bèi  OCR、 yùn háng （ jǐn OCR）、 yùn háng 、 xiào duì 

###  zhǔn bèi 
1.  què rèn yǐ ān zhuāng  Node.js  zuì xīn bǎn 。
2.  yùn háng mìng líng  `npm install`  kāi shǐ ān zhuāng 。

###  zhǔn bèi  OCR
1.  què rèn yǐ ān zhuāng  ffmpeg、Tesseract  yǔ  adb， bìng yǐ jiāng  ffmpeg  kě zhí háng wén jiàn suǒ zài mù lù shè wéi lù jìng huán jìng biàn liáng 。
2.  jiāng zhī chí  USB  tiáo shì de shǒu jī lián jiē zhì diàn nǎo 。
3.  cóng  [Genymobile/scrcpy](https://github.com/Genymobile/scrcpy/releases/latest) Release  yè miàn xià zǎi duì yīng de  server， fàng rù  `data/scrcpy-server`  wén jiàn jiā ， bìng xiū gǎi  `data/scrcpy-server/index.js`。
4.  zhǔn bèi yī gè  Minecraft  ān zhuāng bāo （ zhī chí  apks  gé shì hé  apk  gé shì ）。
5.  jiāng shàng shù  Minecraft  ān zhuāng bāo ān zhuāng dào shǒu jī shàng 。
6.  cóng ān zhuāng bāo zhōng zhǎo dào  Mojangles  zì tǐ ， shǐ yòng  Tesseract  xùn liàn chū mó xíng （ rú yǐ xùn liàn guò kě zhí jiē shǐ yòng xùn liàn guò de mó xíng ）。
    -  rú guǒ nín de  Minecraft  shǐ yòng de zì tǐ bù shì mò rèn de xiàng sù zì tǐ （ jí  Mojangles / Minecraft Seven）， qǐng shǐ yòng  Minecraft  zhèng zài shǐ yòng de zì tǐ jìn háng xùn liàn 。
7.  àn wén jiàn zhōng de zhù shì xiū gǎi  `data/config.js`。

###  yùn háng 
1.  yùn háng  `npm run generate-release`  huò  `npm run generate-beta`， qǔ jué yú nǐ yào shēng chéng nǎ zhǒng bǎn běn de shù jù 。

###  yùn háng （ jǐn OCR）
1.  yùn háng  `npm run generate-release`  huò  `npm run generate-beta`。
2.  dǎ kāi  Minecraft， jìn rù yī gè yǐ kāi qǐ zuò bì de dān rén shì jiè ， děng dài yóu xì jìn rù HUD jiè miàn 。 zài zhōng duān chū xiàn  `Press <Enter> if the device is ready`  tí shì qiě yóu xì yǐ jìn rù HUD jiè miàn shí ， àn xià huí chē 。 chū xiàn  `Please switch to branch: education`  tí shì shí ， jìn rù yī gè yǐ kāi qǐ zuò bì de jiào yù bǎn shì jiè 。 chū xiàn  `Please switch to branch: experiment`  tí shì shí ， jìn rù yī gè yǐ kāi qǐ zuò bì yǔ suǒ yǒu shí yàn xìng gōng néng de dān rén shì jiè 。
3.  cǐ guò chéng zhōng rú guǒ zhōng duān méi yǒu tí shì yào qiú cāo zuò ， qǐng bù yào kòng zhì shǒu jī ， yě bù yào ràng  Minecraft  qiē zhì hòu tái ， fǒu zé kě néng dǎo zhì liú chéng shī bài 。 rú guǒ zūn shǒu shàng shù yào qiú hòu réng rán chū xiàn tí shì  `Auto-completed command test failed`， kě néng wéi  Tesseract  shí bié chū cuò ， nín xū yào jiāng cuò wù de tiáo mù hé duì yīng zhèng què de tiáo mù shǒu dòng bǎo cún dào  `data/config.js`  yǐ biàn ràng běn gōng jù shǒu dòng jiū zhèng 。

###  xiào duì 
1.  jiǎn chá shū chū de  `output/xxx/clib/xxx.json`（ tuò zhǎn bāo ） yǔ  `output/xxx/translation/xxx.xlsx`（ID- fān yì duì zhào biǎo ）。 fā xiàn cuò yì 、 lòu yì shí qǐng xiū gǎi duì yīng de  `translation/xxx.json`， suí hòu cóng “ yùn háng ” gōng zuò liú jì xù 。
2. `translation/xxx.json`  zhī chí yǐn yòng biāo zhǔn huà yì míng biǎo shù jù yǔ Java bǎn yǔ yán shù jù ， bìng qiě zhī chí cóng qí tā yì míng pīn jiē chū xīn de yì míng 。 qǐng jìn liáng shǐ yòng biāo zhǔn huà yì míng huò zhě yóu biāo zhǔn huà yì míng pīn jiē ér lái de fān yì 。 jù tǐ gé shì qǐng cān jiàn  [ fān yì liú chéng ](./translation/README.md# liú chéng )。
