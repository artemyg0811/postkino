import Swiper, { Navigation, Pagination, Grid } from "swiper"
import setDarkHover from "./CardHover.js"

const commerce = document.querySelector('.commerce')

if (commerce) {
	const sliderWrapper = commerce.querySelector('.swiper-wrapper')

	fetch('./assets/data/commerce.json')
		.then(res => res.json())
		.then(data => {
			return data.map(comm => {
				if (comm.video) {
					return `
						<div class="swiper-slide commerce-slide" data-card-dark data-modal-open="video" data-video-src="${comm.video}" style="cursor:pointer;">
							<div class="c-commerce">
								<div class="c-commerce__thumb">
									<img class="c-commerce__img is-main" src="${comm.img}" alt="">
									<img class="c-commerce__img is-second" src="${comm.img}" alt="">
								</div>
							</div>
						</div>
					`.trim()
				}
				else {
					return `
						<div class="swiper-slide commerce-slide" data-card-dark>
							<div class="c-commerce">
								<div class="c-commerce__thumb">
									<img class="c-commerce__img is-main" src="${comm.img}" alt="">
									<img class="c-commerce__img is-second" src="${comm.img}" alt="">
								</div>
							</div>
						</div>
					`.trim()
				}
			}).join('')
		})
		.then(slides => {
			sliderWrapper.innerHTML = slides
		})
		.then(() => {
			const commerceSwiper = new Swiper("[data-swiper=commerce]", {
				modules: [Navigation, Pagination, Grid],

				allowTouchMove: false,
				watchSlidesProgress: true,

				grid: {
					rows: 1,
					fill: 'row',
				},

				breakpoints: {
					900: {
						slidesPerView: 4,
						slidesPerGroup: 4,
						spaceBetween: 40,

						grid: {
							rows: 2,
						}
					},
					410: {
						slidesPerView: 3,
						slidesPerGroup: 3,
						spaceBetween: 20,

						grid: {
							rows: 2,
						}
					},
					0: {
						slidesPerView: 2,
						slidesPerGroup: 2,
						spaceBetween: 20,

						grid: {
							rows: 2,
						}
					}
				},

				navigation: {
					nextEl: '.commerce__arrow.is-next',
					prevEl: '.commerce__arrow.is-prev',
				},
			});

			setDarkHover('[data-swiper=commerce] [data-card-dark-container]')
		})
}
