/* ═══════════════════════════════════════════ */
/* FOOD DATABASE — 130+ common food items      */
/* ═══════════════════════════════════════════ */

window.FoodDB = {
  items: [
    // ═══ PROTEINS ═══
    { name:'Scrambled Eggs', aliases:['eggs','scrambled egg','egg','fried egg'], category:'protein', calories:147, protein:10, carbs:1.6, fat:11, serving:'2 large', unit:'eggs' },
    { name:'Chicken Breast', aliases:['grilled chicken','chicken','chicken breast grilled'], category:'protein', calories:165, protein:31, carbs:0, fat:3.6, serving:'100g', unit:'g' },
    { name:'Salmon Fillet', aliases:['salmon','grilled salmon','baked salmon'], category:'protein', calories:208, protein:20, carbs:0, fat:13, serving:'100g', unit:'g' },
    { name:'Ground Beef', aliases:['beef','minced beef','ground meat','hamburger meat'], category:'protein', calories:250, protein:26, carbs:0, fat:15, serving:'100g', unit:'g' },
    { name:'Turkey Breast', aliases:['turkey','sliced turkey','deli turkey'], category:'protein', calories:135, protein:30, carbs:0, fat:1, serving:'100g', unit:'g' },
    { name:'Tuna', aliases:['canned tuna','tuna fish','tuna can'], category:'protein', calories:116, protein:26, carbs:0, fat:1, serving:'1 can (120g)', unit:'can' },
    { name:'Shrimp', aliases:['prawns','grilled shrimp'], category:'protein', calories:99, protein:24, carbs:0, fat:0.3, serving:'100g', unit:'g' },
    { name:'Pork Chop', aliases:['pork','pork loin'], category:'protein', calories:231, protein:26, carbs:0, fat:14, serving:'1 chop', unit:'chop' },
    { name:'Tofu', aliases:['firm tofu','bean curd'], category:'protein', calories:144, protein:15, carbs:3.5, fat:8, serving:'150g', unit:'g' },
    { name:'Bacon', aliases:['turkey bacon','bacon strips'], category:'protein', calories:43, protein:3, carbs:0, fat:3.3, serving:'1 slice', unit:'slice' },
    { name:'Steak', aliases:['sirloin','ribeye','beef steak','filet'], category:'protein', calories:271, protein:26, carbs:0, fat:18, serving:'170g (6oz)', unit:'oz' },
    { name:'Lamb', aliases:['lamb chop','lamb leg'], category:'protein', calories:294, protein:25, carbs:0, fat:21, serving:'100g', unit:'g' },
    { name:'Sardines', aliases:['canned sardines'], category:'protein', calories:208, protein:25, carbs:0, fat:11, serving:'1 can', unit:'can' },
    { name:'Tilapia', aliases:['white fish','tilapia fillet'], category:'protein', calories:128, protein:26, carbs:0, fat:2.7, serving:'1 fillet', unit:'fillet' },
    { name:'Protein Shake', aliases:['whey protein','protein powder','shake'], category:'protein', calories:120, protein:24, carbs:3, fat:1.5, serving:'1 scoop', unit:'scoop' },
    { name:'Boiled Egg', aliases:['hard boiled egg','egg boiled'], category:'protein', calories:78, protein:6, carbs:0.6, fat:5.3, serving:'1 large', unit:'egg' },
    { name:'Chicken Thigh', aliases:['chicken thighs','dark meat chicken'], category:'protein', calories:209, protein:26, carbs:0, fat:11, serving:'1 thigh', unit:'thigh' },

    // ═══ GRAINS & CARBS ═══
    { name:'White Rice', aliases:['rice','steamed rice','boiled rice'], category:'grain', calories:206, protein:4.3, carbs:45, fat:0.4, serving:'1 cup cooked', unit:'cup' },
    { name:'Brown Rice', aliases:['brown rice cooked'], category:'grain', calories:216, protein:5, carbs:45, fat:1.8, serving:'1 cup cooked', unit:'cup' },
    { name:'Bread', aliases:['white bread','toast','slice of bread','sourdough toast','sourdough','bread slice'], category:'grain', calories:79, protein:2.7, carbs:15, fat:1, serving:'1 slice', unit:'slice' },
    { name:'Whole Wheat Bread', aliases:['wheat bread','whole grain bread','brown bread'], category:'grain', calories:81, protein:4, carbs:14, fat:1.1, serving:'1 slice', unit:'slice' },
    { name:'Pasta', aliases:['spaghetti','penne','noodles','macaroni','fettuccine'], category:'grain', calories:220, protein:8, carbs:43, fat:1.3, serving:'1 cup cooked', unit:'cup' },
    { name:'Oatmeal', aliases:['oats','porridge','rolled oats'], category:'grain', calories:154, protein:5, carbs:27, fat:2.6, serving:'1 cup cooked', unit:'cup' },
    { name:'Quinoa', aliases:['quinoa cooked'], category:'grain', calories:222, protein:8, carbs:39, fat:3.5, serving:'1 cup cooked', unit:'cup' },
    { name:'Corn Tortilla', aliases:['tortilla','taco shell'], category:'grain', calories:52, protein:1.4, carbs:11, fat:0.7, serving:'1 tortilla', unit:'tortilla' },
    { name:'Flour Tortilla', aliases:['wrap','burrito wrap'], category:'grain', calories:146, protein:4, carbs:25, fat:3.5, serving:'1 large', unit:'tortilla' },
    { name:'Bagel', aliases:['plain bagel'], category:'grain', calories:270, protein:10, carbs:53, fat:1.6, serving:'1 bagel', unit:'bagel' },
    { name:'Pancakes', aliases:['pancake','flapjack'], category:'grain', calories:86, protein:2.4, carbs:11, fat:3.7, serving:'1 pancake', unit:'pancake' },
    { name:'Cereal', aliases:['breakfast cereal','corn flakes','cheerios'], category:'grain', calories:140, protein:3, carbs:30, fat:1, serving:'1 cup', unit:'cup' },
    { name:'Granola', aliases:['granola cereal'], category:'grain', calories:200, protein:5, carbs:30, fat:7, serving:'0.5 cup', unit:'cup' },
    { name:'Croissant', aliases:['butter croissant'], category:'grain', calories:231, protein:5, carbs:26, fat:12, serving:'1 croissant', unit:'croissant' },
    { name:'Sweet Potato', aliases:['baked sweet potato','yam'], category:'grain', calories:103, protein:2.3, carbs:24, fat:0.1, serving:'1 medium', unit:'potato' },
    { name:'Potato', aliases:['baked potato','mashed potato','boiled potato'], category:'grain', calories:161, protein:4.3, carbs:37, fat:0.2, serving:'1 medium', unit:'potato' },

    // ═══ DAIRY ═══
    { name:'Whole Milk', aliases:['milk','glass of milk','cow milk'], category:'dairy', calories:149, protein:8, carbs:12, fat:8, serving:'1 cup', unit:'cup' },
    { name:'Skim Milk', aliases:['fat free milk','nonfat milk'], category:'dairy', calories:83, protein:8, carbs:12, fat:0.2, serving:'1 cup', unit:'cup' },
    { name:'Greek Yogurt', aliases:['yogurt','yoghurt','plain yogurt','greek yoghurt'], category:'dairy', calories:100, protein:17, carbs:6, fat:0.7, serving:'1 cup', unit:'cup' },
    { name:'Cheddar Cheese', aliases:['cheese','cheddar','cheese slice'], category:'dairy', calories:113, protein:7, carbs:0.4, fat:9.3, serving:'1 oz (28g)', unit:'oz' },
    { name:'Mozzarella', aliases:['mozzarella cheese','string cheese'], category:'dairy', calories:85, protein:6, carbs:1, fat:6.3, serving:'1 oz (28g)', unit:'oz' },
    { name:'Cottage Cheese', aliases:['cottage'], category:'dairy', calories:206, protein:28, carbs:6, fat:9, serving:'1 cup', unit:'cup' },
    { name:'Cream Cheese', aliases:['cream cheese spread','philly'], category:'dairy', calories:51, protein:0.9, carbs:0.8, fat:5, serving:'1 tbsp', unit:'tbsp' },
    { name:'Butter', aliases:['salted butter','unsalted butter'], category:'dairy', calories:102, protein:0.1, carbs:0, fat:12, serving:'1 tbsp', unit:'tbsp' },
    { name:'Parmesan', aliases:['parmesan cheese','parmigiano'], category:'dairy', calories:21, protein:1.4, carbs:0.2, fat:1.4, serving:'1 tbsp grated', unit:'tbsp' },

    // ═══ FRUITS ═══
    { name:'Banana', aliases:['banana fruit'], category:'fruit', calories:105, protein:1.3, carbs:27, fat:0.4, serving:'1 medium', unit:'banana' },
    { name:'Apple', aliases:['apple fruit','green apple','red apple'], category:'fruit', calories:95, protein:0.5, carbs:25, fat:0.3, serving:'1 medium', unit:'apple' },
    { name:'Orange', aliases:['navel orange','mandarin'], category:'fruit', calories:62, protein:1.2, carbs:15, fat:0.2, serving:'1 medium', unit:'orange' },
    { name:'Strawberries', aliases:['strawberry','berries'], category:'fruit', calories:49, protein:1, carbs:12, fat:0.5, serving:'1 cup', unit:'cup' },
    { name:'Blueberries', aliases:['blueberry'], category:'fruit', calories:85, protein:1.1, carbs:21, fat:0.5, serving:'1 cup', unit:'cup' },
    { name:'Avocado', aliases:['avocado half','guacamole base'], category:'fruit', calories:240, protein:3, carbs:12, fat:22, serving:'1 whole', unit:'avocado' },
    { name:'Grapes', aliases:['grape','red grapes','green grapes'], category:'fruit', calories:104, protein:1.1, carbs:27, fat:0.2, serving:'1 cup', unit:'cup' },
    { name:'Watermelon', aliases:['melon'], category:'fruit', calories:46, protein:0.9, carbs:12, fat:0.2, serving:'1 cup diced', unit:'cup' },
    { name:'Mango', aliases:['mango fruit','fresh mango'], category:'fruit', calories:99, protein:1.4, carbs:25, fat:0.6, serving:'1 cup', unit:'cup' },
    { name:'Pineapple', aliases:['pineapple chunks'], category:'fruit', calories:82, protein:0.9, carbs:22, fat:0.2, serving:'1 cup', unit:'cup' },
    { name:'Peach', aliases:['peaches','nectarine'], category:'fruit', calories:59, protein:1.4, carbs:14, fat:0.4, serving:'1 medium', unit:'peach' },
    { name:'Pear', aliases:['pear fruit'], category:'fruit', calories:101, protein:0.7, carbs:27, fat:0.2, serving:'1 medium', unit:'pear' },
    { name:'Dried Dates', aliases:['dates','medjool dates'], category:'fruit', calories:66, protein:0.4, carbs:18, fat:0, serving:'1 date', unit:'date' },
    { name:'Raisins', aliases:['dried grapes'], category:'fruit', calories:129, protein:1.3, carbs:34, fat:0.2, serving:'0.25 cup', unit:'cup' },

    // ═══ VEGETABLES ═══
    { name:'Broccoli', aliases:['steamed broccoli','broccoli florets'], category:'vegetable', calories:55, protein:3.7, carbs:11, fat:0.6, serving:'1 cup', unit:'cup' },
    { name:'Spinach', aliases:['baby spinach','spinach leaves','raw spinach'], category:'vegetable', calories:7, protein:0.9, carbs:1.1, fat:0.1, serving:'1 cup raw', unit:'cup' },
    { name:'Carrot', aliases:['carrots','baby carrots','carrot sticks'], category:'vegetable', calories:25, protein:0.6, carbs:6, fat:0.1, serving:'1 medium', unit:'carrot' },
    { name:'Tomato', aliases:['tomatoes','cherry tomatoes','roma tomato'], category:'vegetable', calories:22, protein:1.1, carbs:4.8, fat:0.2, serving:'1 medium', unit:'tomato' },
    { name:'Bell Pepper', aliases:['pepper','capsicum','red pepper','green pepper'], category:'vegetable', calories:31, protein:1, carbs:7, fat:0.3, serving:'1 medium', unit:'pepper' },
    { name:'Cucumber', aliases:['sliced cucumber'], category:'vegetable', calories:16, protein:0.7, carbs:3.6, fat:0.1, serving:'1 cup sliced', unit:'cup' },
    { name:'Lettuce', aliases:['romaine lettuce','iceberg','salad greens'], category:'vegetable', calories:5, protein:0.5, carbs:1, fat:0.1, serving:'1 cup', unit:'cup' },
    { name:'Onion', aliases:['onions','white onion','red onion'], category:'vegetable', calories:44, protein:1.2, carbs:10, fat:0.1, serving:'1 medium', unit:'onion' },
    { name:'Corn', aliases:['sweet corn','corn on the cob','corn kernels'], category:'vegetable', calories:96, protein:3.4, carbs:21, fat:1.5, serving:'1 ear', unit:'ear' },
    { name:'Green Beans', aliases:['string beans'], category:'vegetable', calories:31, protein:1.8, carbs:7, fat:0.1, serving:'1 cup', unit:'cup' },
    { name:'Mushrooms', aliases:['mushroom','white mushrooms','button mushrooms'], category:'vegetable', calories:15, protein:2.2, carbs:2.3, fat:0.2, serving:'1 cup', unit:'cup' },
    { name:'Zucchini', aliases:['courgette','grilled zucchini'], category:'vegetable', calories:17, protein:1.2, carbs:3.1, fat:0.3, serving:'1 medium', unit:'zucchini' },
    { name:'Kale', aliases:['kale leaves','raw kale'], category:'vegetable', calories:33, protein:2.9, carbs:6, fat:0.6, serving:'1 cup', unit:'cup' },
    { name:'Cauliflower', aliases:['cauliflower rice','cauliflower florets'], category:'vegetable', calories:25, protein:2, carbs:5, fat:0.3, serving:'1 cup', unit:'cup' },
    { name:'Asparagus', aliases:['asparagus spears'], category:'vegetable', calories:27, protein:2.9, carbs:5.2, fat:0.2, serving:'6 spears', unit:'spears' },

    // ═══ NUTS & LEGUMES ═══
    { name:'Almonds', aliases:['raw almonds','almond'], category:'nut', calories:164, protein:6, carbs:6, fat:14, serving:'1 oz (23 nuts)', unit:'oz' },
    { name:'Peanut Butter', aliases:['pb','peanut butter spread'], category:'nut', calories:94, protein:4, carbs:3, fat:8, serving:'1 tbsp', unit:'tbsp' },
    { name:'Almond Butter', aliases:['almond spread'], category:'nut', calories:98, protein:3.4, carbs:3, fat:9, serving:'1 tbsp', unit:'tbsp' },
    { name:'Walnuts', aliases:['walnut'], category:'nut', calories:185, protein:4.3, carbs:4, fat:18, serving:'1 oz', unit:'oz' },
    { name:'Cashews', aliases:['cashew','cashew nuts'], category:'nut', calories:157, protein:5, carbs:9, fat:12, serving:'1 oz', unit:'oz' },
    { name:'Lentils', aliases:['lentil soup','cooked lentils','dal','daal'], category:'legume', calories:230, protein:18, carbs:40, fat:0.8, serving:'1 cup cooked', unit:'cup' },
    { name:'Chickpeas', aliases:['garbanzo beans','hummus base','canned chickpeas'], category:'legume', calories:269, protein:14.5, carbs:45, fat:4.2, serving:'1 cup', unit:'cup' },
    { name:'Black Beans', aliases:['black bean','canned black beans'], category:'legume', calories:227, protein:15, carbs:41, fat:0.9, serving:'1 cup', unit:'cup' },
    { name:'Kidney Beans', aliases:['red beans','rajma'], category:'legume', calories:225, protein:15, carbs:40, fat:0.9, serving:'1 cup', unit:'cup' },
    { name:'Mixed Nuts', aliases:['trail mix nuts','assorted nuts'], category:'nut', calories:172, protein:5, carbs:7, fat:15, serving:'1 oz', unit:'oz' },

    // ═══ SNACKS ═══
    { name:'Potato Chips', aliases:['chips','crisps','lays'], category:'snack', calories:152, protein:2, carbs:15, fat:10, serving:'1 oz', unit:'oz' },
    { name:'Granola Bar', aliases:['energy bar','nature valley','cereal bar'], category:'snack', calories:190, protein:4, carbs:29, fat:7, serving:'1 bar', unit:'bar' },
    { name:'Protein Bar', aliases:['quest bar','rxbar','kind bar'], category:'snack', calories:210, protein:20, carbs:22, fat:8, serving:'1 bar', unit:'bar' },
    { name:'Popcorn', aliases:['air popped popcorn','movie popcorn'], category:'snack', calories:93, protein:3, carbs:19, fat:1.1, serving:'3 cups popped', unit:'cup' },
    { name:'Dark Chocolate', aliases:['chocolate','chocolate bar','dark chocolate square'], category:'snack', calories:170, protein:2.2, carbs:13, fat:12, serving:'1 oz', unit:'oz' },
    { name:'Rice Cake', aliases:['rice cakes','puffed rice cake'], category:'snack', calories:35, protein:0.7, carbs:7.3, fat:0.3, serving:'1 cake', unit:'cake' },
    { name:'Crackers', aliases:['saltines','graham crackers','ritz crackers'], category:'snack', calories:60, protein:1, carbs:10, fat:1.5, serving:'4 crackers', unit:'crackers' },
    { name:'Pretzels', aliases:['pretzel sticks'], category:'snack', calories:108, protein:3, carbs:23, fat:1, serving:'1 oz', unit:'oz' },
    { name:'Ice Cream', aliases:['vanilla ice cream','ice cream scoop'], category:'snack', calories:137, protein:2.3, carbs:16, fat:7.3, serving:'0.5 cup', unit:'cup' },
    { name:'Cookie', aliases:['chocolate chip cookie','biscuit'], category:'snack', calories:78, protein:0.9, carbs:10, fat:3.6, serving:'1 cookie', unit:'cookie' },

    // ═══ BEVERAGES ═══
    { name:'Black Coffee', aliases:['coffee','americano','espresso','drip coffee'], category:'beverage', calories:2, protein:0.3, carbs:0, fat:0, serving:'1 cup', unit:'cup' },
    { name:'Latte', aliases:['cafe latte','coffee latte','milk coffee'], category:'beverage', calories:190, protein:10, carbs:18, fat:7, serving:'16 oz', unit:'cup' },
    { name:'Orange Juice', aliases:['oj','fresh orange juice','juice'], category:'beverage', calories:112, protein:1.7, carbs:26, fat:0.5, serving:'1 cup', unit:'cup' },
    { name:'Coca-Cola', aliases:['coke','soda','cola','pepsi','soft drink'], category:'beverage', calories:140, protein:0, carbs:39, fat:0, serving:'12 oz can', unit:'can' },
    { name:'Green Tea', aliases:['tea','matcha','herbal tea'], category:'beverage', calories:2, protein:0, carbs:0, fat:0, serving:'1 cup', unit:'cup' },
    { name:'Smoothie', aliases:['fruit smoothie','protein smoothie','berry smoothie'], category:'beverage', calories:230, protein:6, carbs:44, fat:3, serving:'16 oz', unit:'cup' },
    { name:'Beer', aliases:['lager','ale','craft beer','ipa'], category:'beverage', calories:153, protein:1.6, carbs:13, fat:0, serving:'12 oz', unit:'can' },
    { name:'Red Wine', aliases:['wine','glass of wine','white wine'], category:'beverage', calories:125, protein:0.1, carbs:4, fat:0, serving:'5 oz glass', unit:'glass' },
    { name:'Coconut Water', aliases:['coconut drink'], category:'beverage', calories:46, protein:1.7, carbs:9, fat:0.5, serving:'1 cup', unit:'cup' },
    { name:'Almond Milk', aliases:['oat milk','soy milk','plant milk'], category:'beverage', calories:39, protein:1, carbs:3.4, fat:2.5, serving:'1 cup', unit:'cup' },

    // ═══ CONDIMENTS ═══
    { name:'Olive Oil', aliases:['extra virgin olive oil','evoo','cooking oil'], category:'condiment', calories:119, protein:0, carbs:0, fat:14, serving:'1 tbsp', unit:'tbsp' },
    { name:'Honey', aliases:['raw honey'], category:'condiment', calories:64, protein:0.1, carbs:17, fat:0, serving:'1 tbsp', unit:'tbsp' },
    { name:'Ketchup', aliases:['tomato ketchup','catsup'], category:'condiment', calories:20, protein:0.2, carbs:5, fat:0, serving:'1 tbsp', unit:'tbsp' },
    { name:'Mayonnaise', aliases:['mayo'], category:'condiment', calories:94, protein:0.1, carbs:0.1, fat:10, serving:'1 tbsp', unit:'tbsp' },
    { name:'Soy Sauce', aliases:['soya sauce','tamari'], category:'condiment', calories:8, protein:1.3, carbs:1, fat:0, serving:'1 tbsp', unit:'tbsp' },
    { name:'Hot Sauce', aliases:['sriracha','tabasco','chili sauce'], category:'condiment', calories:3, protein:0.1, carbs:0.6, fat:0, serving:'1 tsp', unit:'tsp' },
    { name:'Hummus', aliases:['hummus dip'], category:'condiment', calories:70, protein:2, carbs:4, fat:5, serving:'2 tbsp', unit:'tbsp' },
    { name:'Salsa', aliases:['tomato salsa','pico de gallo'], category:'condiment', calories:10, protein:0.5, carbs:2, fat:0, serving:'2 tbsp', unit:'tbsp' },

    // ═══ COMMON MEALS ═══
    { name:'Pizza Slice', aliases:['pizza','cheese pizza','pepperoni pizza','slice of pizza'], category:'meal', calories:285, protein:12, carbs:36, fat:10, serving:'1 large slice', unit:'slice' },
    { name:'Cheeseburger', aliases:['burger','hamburger','beef burger'], category:'meal', calories:354, protein:20, carbs:29, fat:17, serving:'1 burger', unit:'burger' },
    { name:'Chicken Sandwich', aliases:['sandwich','grilled chicken sandwich'], category:'meal', calories:400, protein:28, carbs:42, fat:12, serving:'1 sandwich', unit:'sandwich' },
    { name:'Caesar Salad', aliases:['salad','chicken caesar salad','green salad'], category:'meal', calories:320, protein:16, carbs:15, fat:22, serving:'1 bowl', unit:'bowl' },
    { name:'Burrito', aliases:['chicken burrito','bean burrito','burrito bowl'], category:'meal', calories:430, protein:18, carbs:52, fat:16, serving:'1 burrito', unit:'burrito' },
    { name:'Sushi Roll', aliases:['sushi','california roll','maki roll','salmon roll'], category:'meal', calories:255, protein:9, carbs:38, fat:7, serving:'6 pieces', unit:'roll' },
    { name:'Fried Rice', aliases:['egg fried rice','chinese rice'], category:'meal', calories:333, protein:8.5, carbs:49, fat:11, serving:'1 cup', unit:'cup' },
    { name:'Chicken Wings', aliases:['wings','buffalo wings','hot wings'], category:'meal', calories:88, protein:8, carbs:0.8, fat:6, serving:'1 wing', unit:'wing' },
    { name:'Fish Tacos', aliases:['tacos','chicken tacos','taco'], category:'meal', calories:290, protein:15, carbs:28, fat:13, serving:'2 tacos', unit:'taco' },
    { name:'Grilled Cheese', aliases:['grilled cheese sandwich','cheese sandwich'], category:'meal', calories:366, protein:14, carbs:28, fat:23, serving:'1 sandwich', unit:'sandwich' },
    { name:'French Fries', aliases:['fries','chips','potato fries'], category:'meal', calories:312, protein:3.4, carbs:41, fat:15, serving:'medium serving', unit:'serving' },
    { name:'Ramen', aliases:['instant noodles','cup noodles','ramen noodles'], category:'meal', calories:380, protein:10, carbs:52, fat:14, serving:'1 bowl', unit:'bowl' },
    { name:'Chicken Nuggets', aliases:['nuggets','mcnuggets'], category:'meal', calories:286, protein:18, carbs:18, fat:16, serving:'6 pieces', unit:'pieces' },
    { name:'Omelette', aliases:['omelet','cheese omelette','veggie omelette'], category:'meal', calories:182, protein:13, carbs:1.6, fat:14, serving:'2 egg omelette', unit:'omelette' },
    { name:'Acai Bowl', aliases:['acai','smoothie bowl'], category:'meal', calories:320, protein:5, carbs:52, fat:10, serving:'1 bowl', unit:'bowl' },
    { name:'Wrap', aliases:['chicken wrap','veggie wrap','turkey wrap'], category:'meal', calories:350, protein:22, carbs:38, fat:12, serving:'1 wrap', unit:'wrap' },
  ],

  search(query) {
    query = query.toLowerCase().trim();
    if (!query) return null;
    let m = this.items.find(f => f.name.toLowerCase() === query);
    if (m) return m;
    m = this.items.find(f => f.aliases.some(a => a === query));
    if (m) return m;
    m = this.items.find(f => f.name.toLowerCase().includes(query) || query.includes(f.name.toLowerCase()));
    if (m) return m;
    m = this.items.find(f => f.aliases.some(a => a.includes(query) || query.includes(a)));
    return m || null;
  },

  parseNLP(text) {
    const parts = text.split(/,|\band\b|\n/).map(p => p.trim()).filter(Boolean);
    const results = [];
    for (const part of parts) {
      let qty = 1, foodStr = part;
      const qm = part.match(/^(\d+\.?\d*|a|an|one|two|three|four|five|six|half|quarter)\s+/i);
      if (qm) {
        const qMap = {a:1,an:1,one:1,two:2,three:3,four:4,five:5,six:6,half:0.5,quarter:0.25};
        qty = qMap[qm[1].toLowerCase()] || parseFloat(qm[1]) || 1;
        foodStr = part.slice(qm[0].length);
      }
      foodStr = foodStr.replace(/^(slices?\s+of|cups?\s+of|pieces?\s+of|servings?\s+of|bowls?\s+of|glasses?\s+of|scoops?\s+of)\s*/i, '').trim();
      const food = this.search(foodStr);
      if (food) {
        results.push({ food:{...food}, quantity:qty,
          totalCalories:Math.round(food.calories*qty), totalProtein:Math.round(food.protein*qty*10)/10,
          totalCarbs:Math.round(food.carbs*qty*10)/10, totalFat:Math.round(food.fat*qty*10)/10 });
      } else {
        results.push({ food:{name:foodStr,aliases:[],category:'unknown',calories:0,protein:0,carbs:0,fat:0,serving:'1 serving',unit:'serving'},
          quantity:qty, totalCalories:0, totalProtein:0, totalCarbs:0, totalFat:0, unknown:true });
      }
    }
    return results;
  },

  getRandomMeal(count = 4) {
    const mealItems = this.items.filter(f => ['protein','grain','vegetable','fruit','dairy','meal'].includes(f.category));
    const shuffled = [...mealItems].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(food => ({
      food:{...food}, quantity:1,
      totalCalories:food.calories, totalProtein:food.protein, totalCarbs:food.carbs, totalFat:food.fat
    }));
  },
};
