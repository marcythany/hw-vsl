// assets/js/thankyou.js
import {
	bonuses,
	footerText,
	getCurrentYear,
	offers,
	productName,
} from './modules/data.js';

// Cache DOM elements
const dom = {
	productName: document.getElementById('product-name'),
	orderBottles: document.getElementById('order-bottles'),
	orderTotal: document.getElementById('order-total'),
	orderShipping: document.getElementById('order-shipping'),
	customerName: document.getElementById('customer-name'),
	customerEmail: document.getElementById('customer-email'),
	customerPhone: document.getElementById('customer-phone'),
	bonusTitleText: document.getElementById('bonus-title-text'),
	bonusImage: document.getElementById('bonus-image'),
	bonusDescription: document.getElementById('bonus-description'),
	footerDisclaimer: document.getElementById('footer-disclaimer'),
	currentYear: document.getElementById('current-year'),
};

// Parse URL params once
const params = new URLSearchParams(window.location.search);
const bottles = parseInt(params.get('bottles'), 10);
const name = params.get('name');
const email = params.get('email');
const phone = params.get('phone');

/**
 * Display order info and bonus.
 * Redirect to home if invalid bottles param.
 */
function displayOrderInfo() {
	if (isNaN(bottles) || bottles <= 0) {
		window.location.href = 'index.html';
		return;
	}

	const offer = offers.find((o) => o.bottles === bottles);
	if (!offer) return;

	dom.productName.textContent = `${productName} (${bottles} Bottles)`;
	dom.orderBottles.textContent = `${bottles} Bottles (${offer.supply})`;
	dom.orderTotal.textContent = offer.totalPrice;
	dom.orderShipping.textContent = offer.shipping;

	dom.customerName.textContent = name ?? 'Not provided';
	dom.customerEmail.textContent = email ?? 'Not provided';
	dom.customerPhone.textContent = phone ?? 'Not provided';

	const bonus = bonuses[bottles];
	if (bonus) {
		dom.bonusTitleText.textContent = bonus.title;
		dom.bonusImage.src = `assets/img/${bonus.image}`;
		dom.bonusImage.alt = bonus.title;
		dom.bonusDescription.textContent = `As a thank you for ordering ${bottles} bottles, you'll receive our exclusive "${bonus.title}" absolutely free!`;
	} else {
		document.getElementById('bonus-section').classList.add('d-none');
	}
}

/**
 * Initialize page: display info, set footer, auto-dismiss alert.
 */
document.addEventListener('DOMContentLoaded', () => {
	displayOrderInfo();

	// Set dynamic footer
	if (dom.footerDisclaimer) dom.footerDisclaimer.textContent = footerText;
	if (dom.currentYear) dom.currentYear.textContent = getCurrentYear();

	// Auto-dismiss alert after 10s
	const alertEl = document.querySelector('.alert');
	if (!alertEl) return;
	setTimeout(() => {
		bootstrap.Alert.getOrCreateInstance(alertEl).close();
	}, 10000);
});
