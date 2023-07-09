let page = 1;
let pageInfo = {
    "total_records": 52,
    "total_pages": 6,
    "page_size": 10,
    "current_page": 1
};

const botonBack = document.getElementById('btnBack');
const botonNext = document.getElementById('btnNext');

botonNext.addEventListener('click', () => {

    if (page < pageInfo.total_pages) {
        page += 1;
        loadAnimation(false, true);
        loadProducts();
    }

});

botonBack.addEventListener('click', () => {

    if (page > 1) {
        page -= 1;
        loadAnimation(false, true);
        loadProducts();
    }

});

const loadProducts = async () => {

    try {

        const response = await fetch(`https://enowhi3rnf.execute-api.us-east-1.amazonaws.com/dev/products/v1/classifications/WL2-005/products?order_by=41&size=10&agency=01&project_id=01&page=${page}&test_ab=8G87oSL3RyqPjkicwnWaqQ`)

        if (response.status == 200) {

            const data = await response.json();
            const { records, page_info } = data;
            pageInfo = page_info;

            let products = '';

            records.forEach(record => {
                products += `
                    <div class="container__product">
                        <img src="${record.image_options.thumbnail}" alt="">

                        <div>
                            ${(record.variants)
                        ? `<img class="color__variant"
                                    src=${record.variants.color[0].image_options.thumbnail}></img>`
                        : ''
                    }
                        </div>

                        <div class="content__text">
                            <h2 class="title__product">${record.name}</h2>
                            <div
                                class="container__description"
                            >${record.expression_visual[0].format_html}</div>
                        </div>

                    </div>
                `;
            });

            document.getElementById('container').innerHTML = products;

            loadAnimation(false, false);

        }



    } catch (error) {
        console.log('error', error)
    }

}

const loadAnimation = (isFirstTime, isLoading) => {

    if (isLoading) {

        const divElement = document.createElement("div");
        divElement.id = "loading";

        const container = document.getElementById("container__loading");
        container.appendChild(divElement);

        const animation = `<svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>`;

        document.getElementById('loading').innerHTML = animation;

    } else {
        const loading = document.getElementById('loading');

        if(loading) { loading.remove(); }
    }

    if (isFirstTime) loadProducts();

}


loadAnimation(true, true);