// assets/js/modules/data.js

export const productName = 'Natty Lean';

/**
 * Returns the current year for footer.
 */
export const getCurrentYear = () => new Date().getFullYear();

export const offers = [
	{
		bottles: 6,
		supply: '180 Days Supply',
		guarantee: '60 Days Guarantee',
		pricePerBottle: '$49.00',
		discount: '72% OFF',
		fullPrice: '$1074 Full',
		totalPrice: '$294 Total',
		shipping: 'FREE Shipping',
		image: 'img-6-bottles.webp',
		highlight: true,
	},
	{
		bottles: 3,
		supply: '90 Days Supply',
		guarantee: '60 Days Guarantee',
		pricePerBottle: '$69.00',
		discount: '61% OFF',
		fullPrice: '$537 Full',
		totalPrice: '$207 Total',
		shipping: 'FREE Shipping',
		image: 'img-3-bottles.webp',
		highlight: false,
	},
	{
		bottles: 2,
		supply: '60 Days Supply',
		guarantee: '60 Days Guarantee',
		pricePerBottle: '$79.00',
		discount: '56% OFF',
		fullPrice: '$358 Full',
		totalPrice: '$158 Total',
		shipping: '$9.99 Shipping',
		image: 'img-2-bottles.webp',
		highlight: false,
	},
];

export const guaranteeContent = {
	title: '100% Satisfaction or Your Money Back',
	subtitle: '180‑Day Guarantee',
	description: `
We're so confident you'll achieve incredible results that we back ${productName} with a 100% satisfaction guarantee for 180 days. Start using it as soon as it arrives, and within days, you may notice an increase in energy, a clearer mind, and reduced cravings. As you continue your journey, you could start to see gradual weight loss and a reduction in stubborn fat, making it the perfect time to track your progress. If after several weeks or even months you're not completely satisfied, we'll refund your money in full. With ${productName}, you're truly in control of your weight loss journey.
  `.trim(),
	seals: ['guarantee-badge.webp', 'fda.png', 'gmo.png', 'gmp.png', 'nat.png'],
};

export const faqs = [
	{
		question: `Is ${productName} Safe to Use?`,
		answer: `Absolutely. ${productName} is made with 100% natural ingredients and 
is manufactured in the USA in an FDA-registered facility following GMP. Consult your healthcare 
provider before starting.`,
	},
	{
		question: 'How Long Will It Take to See Results?',
		answer: `Many users start noticing changes within the first few weeks. For optimal 
results, use consistently for at least 3 months.`,
	},
	{
		question: 'Will I Need to Follow a Strict Diet or Exercise?',
		answer: `${productName} helps burn fat more efficiently without extreme diets. 
Combining with balanced diet and regular activity can boost results.`,
	},
	{
		question: `Can I Use ${productName} with Other Supplements?`,
		answer: `Yes, but avoid overlapping ingredients with similar products.`,
	},
	{
		question: 'How Fast Will I Receive My Order?',
		answer: `Processing: 2–3 days. US delivery: 5–7 days. International: 10–12 days.`,
	},
	{
		question: `What's the Best Way to Take ${productName}?`,
		answer: `Take as directed on the label with a glass of water before meals. Consistency is key.`,
	},
];

export const references = [
	'Beta-Hydroxybutyrate: Its Role in Fat Metabolism and Weight Loss - Cahill GF Jr. (Metabolic Studies, 2017)',
	'Ketogenic Diets and Their Effectiveness in Promoting Weight Loss - Paoli A, et al. (Nutrition & Metabolism, 2014)',
	'Exogenous Ketones and Fat Burning: Insights into Weight Loss - Stubbs BJ, et al. (Obesity Research & Clinical Practice, 2018)',
	"The Role of Magnesium in Metabolism and Weight Reduction - DiNicolantonio JJ, O'Keefe JH (Open Heart, 2018)",
	'Calcium Intake and Fat Loss: Mechanisms and Evidence - Zemel MB (International Journal of Obesity, 2004)',
	"Sodium's Impact on Weight Regulation and Water Retention - He FJ, MacGregor GA (Journal of Human Nutrition and Dietetics, 2018)",
	"The Appetite-Suppressing Effects of Ketosis: Beta-Hydroxybutyrate's Role - Gibson AA, et al. (Appetite, 2015)",
	'Ketone Bodies as a Fuel Source: Implications for Weight Management - Volek JS, Phinney SD (Journal of Nutrition and Metabolism, 2012)',
	'Intermittent Fasting and Ketosis: Effects on Fat Loss - Mattson MP, et al. (New England Journal of Medicine, 2019)',
	'Low-Carb Diets and Weight Loss: A Comprehensive Review - Brehm BJ, et al. (Journal of Clinical Endocrinology & Metabolism, 2003)',
	'Magnesium and Its Role in Metabolism During Weight Loss - Barbagallo M, Dominguez LJ (Current Obesity Reports, 2010)',
	'Beta-Hydroxybutyrate and Fat Burning: How It Enhances Weight Loss - Newport MT, et al. (Nutrition Research, 2015)',
	'The Impact of Ketones on Physical Performance and Weight Reduction - Evans M, et al. (Journal of Physiology, 2017)',
	'Anti-Inflammatory Effects of Beta-Hydroxybutyrate and Their Role in Fat Loss - Youm YH, et al. (Nature Reviews, 2015)',
	'The Effects of Sodium on Hydration and Weight Control - Houston M (Nutrition Research Reviews, 2010)',
	'Gut Microbiome Changes During Ketogenic Diets and Weight Loss - Ang QY, et al. (Cell Metabolism, 2020)',
	'Exercise Combined with Ketones for Accelerated Fat Loss - Egan B, et al. (Sports Medicine, 2017)',
	"Beta-Hydroxybutyrate's Role in Suppressing Appetite During Weight Loss - Sumithran P, et al. (Obesity, 2013)",
	'Long-term Effects of Low-Carb Diets on Body Composition and Weight - Bueno NB, et al. (British Journal of Nutrition, 2013)',
	'The Role of Ketone Supplements in Enhancing Weight Loss and Fat Oxidation - Clarke K, et al. (Frontiers in Physiology, 2019)',
];

export const footerText = `
Statements on this website have not 
been evaluated by the Food and 
Drug Administration. Products are 
not intended to diagnose, treat, cure 
or prevent any disease. 
The website's content and the 
product for sale is based upon the 
author's opinion and is provided 
solely on an "AS IS" and "AS 
AVAILABLE" basis. You should do 
your own research and confirm the 
information with other sources 
when searching for information 
regarding health issues and always 
review the information carefully with 
your professional health care 
provider before using any of the 
protocols presented on this website 
and/or in the product sold here. 
Neither H&W nor the author are 
engaged in rendering medical or 
similar professional services or 
advice via this website or in the 
product, and the information 
provided is not intended to replace 
medical advice offered by a 
physician or other licensed 
healthcare provider. You should not 
construe H&W's sale of this product 
as an endorsement by H&W of the 
views expressed herein, or any 
warranty or guarantee of any 
strategy, recommendation, 
treatment, action, or application of 
advice made by the author of the 
product. 
 
Some names and personal 
identifying information on this site 
have been changed to protect the 
privacy of individuals. 
 
H&W is the retailer of this product. 
H&W® is a registered trademark of 
H&W, Inc., a Delaware corporation 
located at 1444 S. Entertainment 
Ave., Suite 410 Boise, ID 83709, USA 
and used by permission. H&W's role 
as retailer does not constitute an 
endorsement, approval or review of 
this product or any claim, statement 
or opinion used in promotion of this 
product.
`;

export const bonuses = {
	6: { title: 'Ultimate Weight Loss Guide', image: 'bonus1.webp' },
	3: { title: 'Healthy Recipes Collection', image: 'bonus2.webp' },
	2: { title: 'Quick Start Exercise Plan', image: 'bonus3.webp' },
};
