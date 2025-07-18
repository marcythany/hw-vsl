import {
	bonuses,
	faqs,
	footerText,
	guaranteeContent,
	offers,
	references,
} from './modules/data.js';

// ── Globals for YouTube API ────────────────────────────────────────────────
let ytPlayer = null;
let pendingYtId = null;

// Called by the YouTube IFrame API when it’s ready
window.onYouTubeIframeAPIReady = () => {
	if (!pendingYtId) return;
	ytPlayer = new YT.Player('yt-player', {
		videoId: pendingYtId,
		playerVars: { controls: 1, modestbranding: 1 },
		events: { onStateChange: onYTStateChange },
	});
};

// ── DOM Ready ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
	populateReferences();
	populateGuarantee();
	populateFAQs();
	setupFooter();
	generateOffers();
	hideSections();

	// load video (YouTube/Vimeo/local)
	loadVideoBlock();

	setupVideoTrigger();
	setupFormHandler();
	window.addEventListener('resize', debounce(generateOffers, 150));
});

// ── Section Hiding ─────────────────────────────────────────────────────────
const sections = [
	'countdown-section-1',
	'offers-section-1',
	'guarantee-section',
	'countdown-section-2',
	'offers-section-2',
	'faq-section',
	'countdown-section-3',
	'offers-section-3',
];
function hideSections() {
	sections.forEach((id) =>
		document.getElementById(id)?.classList.add('d-none')
	);
}

// ── Video Trigger ───────────────────────────────────────────────────────────
function setupVideoTrigger() {
	const video = document.getElementById('main-video');
	if (!video) return;
	let triggered = false;
	video.addEventListener('timeupdate', () => {
		if (!triggered && video.currentTime >= 1214) {
			activateSalesLayout();
			triggered = true;
		}
	});
}

// ── Sales Layout Activation ─────────────────────────────────────────────────
function activateSalesLayout() {
	document.getElementById('references-section')?.classList.add('d-none');
	sections.forEach((id) =>
		document.getElementById(id)?.classList.remove('d-none')
	);
	document.querySelector('header')?.classList.remove('sticky-top');
	initCountdown();
}

// ── Countdown ───────────────────────────────────────────────────────────────
function initCountdown() {
	const displays = document.querySelectorAll('.countdown-display');
	let timeLeft = 1200;
	function update() {
		const m = Math.floor(timeLeft / 60);
		const s = String(timeLeft % 60).padStart(2, '0');
		displays.forEach((el) => {
			el.textContent = `${m}:${s}`;
			el.setAttribute(
				'aria-label',
				`Time remaining: ${m} minutes and ${s} seconds`
			);
		});
		if (timeLeft-- <= 0) {
			clearInterval(timer);
			displays.forEach((el) => {
				el.textContent = '0:00';
				el.setAttribute('aria-label', 'Offer expired');
			});
		}
	}
	const timer = setInterval(update, 1000);
	update();
}

// ── Populate References / Guarantee / FAQs ─────────────────────────────────
function populateReferences() {
	const grid = document.getElementById('references-grid');
	if (!grid) return;
	grid.innerHTML = references
		.map(
			(ref, i) => `
    <div class="reference-card" tabindex="0" role="region" aria-label="Reference ${
			i + 1
		}">
      <div class="card-body"><p class="text-center">${ref}</p></div>
    </div>`
		)
		.join('');
}

function populateGuarantee() {
	const g = guaranteeContent;
	document.getElementById('guarantee-content').innerHTML = `
    <div class="col-md-5 text-center">
      <img src="assets/img/seals/${
				g.seals[0]
			}" alt="Guarantee" class="img-fluid" style="max-height:200px">
    </div>
    <div class="col-md-7 text-md-start text-center">
      <h2>${g.title}</h2>
      <h3 class="text-muted">${g.subtitle}</h3>
      <p>${g.description}</p>
      <div class="d-flex flex-wrap gap-2 justify-content-center mt-3">
        ${g.seals
					.slice(1)
					.map(
						(seal) =>
							`<img src="assets/img/seals/${seal}" alt="${seal}" style="max-height:70px">`
					)
					.join('')}
      </div>
    </div>`;
}

function populateFAQs() {
	const accordion = document.getElementById('faq-accordion');
	if (!accordion) return;
	accordion.innerHTML = faqs
		.map(
			(faq, i) => `
    <div class="accordion-item">
      <h2 class="accordion-header" id="faq${i}">
        <button class="accordion-button${
					i > 0 ? ' collapsed' : ''
				}" type="button"
          data-bs-toggle="collapse" data-bs-target="#collapse${i}"
          aria-expanded="${i == 0}" aria-controls="collapse${i}">
          ${faq.question}
        </button>
      </h2>
      <div id="collapse${i}" class="accordion-collapse collapse${
				i == 0 ? ' show' : ''
			}" aria-labelledby="faq${i}">
        <div class="accordion-body">${faq.answer}</div>
      </div>
    </div>`
		)
		.join('');
}

// ── Form Handler ────────────────────────────────────────────────────────────
function setupFormHandler() {
	document.getElementById('purchase-form')?.addEventListener('submit', (e) => {
		e.preventDefault();
		const form = e.target;
		if (!form.checkValidity()) {
			form.classList.add('was-validated');
			return;
		}
		const data = new FormData(form);
		const params = new URLSearchParams({
			bottles: data.get('bottles'),
			name: data.get('name'),
			email: data.get('email'),
			phone: data.get('phone'),
		});
		window.location.href = `thankyou.html?${params}`;
	});
}

// ── Offers Grid ─────────────────────────────────────────────────────────────
function generateOffers() {
	const grids = document.querySelectorAll(
		'.offers-grid, #offers-grid-1, #offers-grid-2, #offers-grid-3'
	);
	const sorted = window.innerWidth > 768 ? [2, 6, 3] : [6, 3, 2];
	const items = sorted.map((b) => offers.find((o) => o.bottles === b));
	grids.forEach((g) => {
		g.innerHTML = items
			.map(
				(o) => `
      <div class="col-md-4">
        <div class="card offer-card h-100 ${
					o.highlight ? 'highlight-offer' : ''
				}" role="region" tabindex="0">
          <div class="card-body text-center p-4">
            <img src="assets/img/offers/${o.image}" alt="${
					o.bottles
				} bottles" class="img-fluid mb-3" style="max-height:150px">
            <h3>${o.bottles} Bottles</h3>
            <p class="text-muted">${o.supply}</p>
            <p class="text-success"><i class="bi bi-shield-check me-1"></i>${
							o.guarantee
						}</p>
            <div class="price-section mb-3">
              <div class="d-flex justify-content-between"><span>Per Bottle:</span><span>${
								o.pricePerBottle
							}</span></div>
              <div class="d-flex justify-content-between"><span>Discount:</span><span class="badge bg-danger">${
								o.discount
							}</span></div>
              <div class="d-flex justify-content-between"><span>Full Price:</span><span class="text-decoration-line-through">${
								o.fullPrice
							}</span></div>
              <div class="d-flex justify-content-between fw-bold"><span>Total:</span><span class="text-primary">${
								o.totalPrice
							}</span></div>
              <div class="d-flex justify-content-between"><span>Shipping:</span><span>${
								o.shipping
							}</span></div>
            </div>
            ${
							bonuses[o.bottles]
								? `<div class="bonus-section bg-light p-2"><small>${
										bonuses[o.bottles].title
								  }</small></div>`
								: ''
						}
            <button class="btn btn-primary w-100 order-btn mt-3" data-bs-toggle="modal" data-bs-target="#purchaseModal" data-bottles="${
							o.bottles
						}">
              <i class="bi bi-cart-plus"></i> Order Now
            </button>
          </div>
        </div>
      </div>`
			)
			.join('');
	});
	document.querySelectorAll('.order-btn').forEach((btn) => {
		btn.onclick = () => {
			document.getElementById('selected-offer').value = btn.dataset.bottles;
		};
	});
}

// ── Footer & Theme / Debounce ───────────────────────────────────────────────
function setupFooter() {
	document
		.querySelectorAll('#current-year')
		.forEach((e) => (e.textContent = new Date().getFullYear()));
	document.getElementById('footer-disclaimer').textContent = footerText;
}

function initTheme() {
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	document.documentElement.setAttribute(
		'data-theme',
		prefersDark ? 'low-light' : 'light'
	);
}

function debounce(fn, delay) {
	let t;
	return (...args) => {
		clearTimeout(t);
		t = setTimeout(() => fn(...args), delay);
	};
}

// ── Video Loader (YouTube / Vimeo / MP4) ───────────────────────────────────
function loadVideoBlock() {
	const container = document.getElementById('video-block');
	if (!container) return;

	const src = container.dataset.src.trim();
	const poster = container.dataset.poster;
	const ytMatch = src.match(
		/(?:youtu\.be\/|youtube\.com\/watch\?v=)([A-Za-z0-9_-]{11})/
	);
	const vimeoMatch = src.match(/vimeo\.com\/(\d+)/);

	container.innerHTML = '';

	if (ytMatch) {
		// YouTube
		pendingYtId = ytMatch[1];
		const div = document.createElement('div');
		div.id = 'yt-player';
		container.appendChild(div);

		// If API already there, init now
		if (window.YT && YT.Player) {
			window.onYouTubeIframeAPIReady();
		}
	} else if (vimeoMatch) {
		// Vimeo
		const iframe = document.createElement('iframe');
		iframe.src = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
		iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
		iframe.setAttribute('allowfullscreen', '');
		container.appendChild(iframe);
	} else {
		// Local MP4
		const video = document.createElement('video');
		video.id = 'main-video';
		video.classList.add('w-100', 'h-100');
		video.controls = true;
		video.preload = 'metadata';
		if (poster) video.poster = poster;

		const source = document.createElement('source');
		source.src = src;
		source.type = 'video/mp4';
		video.appendChild(source);

		container.appendChild(video);
	}
}

// ── YouTube State Polling ───────────────────────────────────────────────────
function onYTStateChange(event) {
	if (event.data === YT.PlayerState.PLAYING && !window.ytTimePoll) {
		window.ytTimePoll = setInterval(() => {
			const t = ytPlayer.getCurrentTime();
			if (t >= 1214) {
				clearInterval(window.ytTimePoll);
				activateSalesLayout();
			}
		}, 500);
	}
	if (event.data !== YT.PlayerState.PLAYING && window.ytTimePoll) {
		clearInterval(window.ytTimePoll);
		window.ytTimePoll = null;
	}
}
