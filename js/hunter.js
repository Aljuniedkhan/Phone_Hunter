const loadphone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = (data.data)
    // console.log(phones)
    displayPhone(phones, isShowAll)
}

const displayPhone = (phones, isShowAll) => {
    // console.log(phones)

    // catch the container where i want to add div
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''
    const showAllButton = document.getElementById('Showall-Button');
    if (phones.length > 5) {
        showAllButton.classList.remove('hidden');
    } else {
        showAllButton.classList.add('hidden');
    }
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }


    phones.forEach(phones => {
        // console.log(phones)
        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 w-96 shadow-xl p-5`
        phoneCard.innerHTML = `
    <figure>
        <img
        src=${phones.image}
        alt="Shoes" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${phones.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phones.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
        </div>
    </div>
    `
        phoneContainer.appendChild(phoneCard);
    });

    toggleLoadingSpinner(false);
}
loadphone()

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadphone(searchText, isShowAll);
}
// loading spinner function
const toggleLoadingSpinner = (isloading) => {
    const loadingSpinner = document.getElementById('spinner');
    if (isloading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = () => {
    const handleShowAll = document.getElementById('Showall-Button')
    handleSearch(true)

}
// handle show detail function
const handleShowDetails = async (id) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone=data.data;
    showPhoneDetails(phone);

}
const showPhoneDetails = (phone) => {
    const phoneName=document.getElementById('show-detail-phone-name');
    phoneName.innerText= phone.name;
    const showDetailContainer=document.getElementById('show-detail-container');
    showDetailContainer.innerHTML=`
    <img src="${phone.image}" alt="" />
    <p class="font-bold">Storage:<span class="font-thin">${phone.mainFeatures.storage}</span></p>
    <p class="font-bold">Display Size:<span class="font-thin">${phone.mainFeatures.displaySize}</span></p>
    <p class="font-bold">Chip Set:<span class="font-thin">${phone.mainFeatures.chipSet}</span></p>
    <p class="font-bold">Memory:<span class="font-thin">${phone.mainFeatures.memory}</span></p>
    <p class="font-bold">Slug:<span class="font-thin">${phone.slug}</span></p>
    <p class="font-bold">Release Date:<span class="font-thin">${phone.releaseDate}</span></p>
    <p class="font-bold">Brand:<span class="font-thin">${phone.brand}</span></p>
    <p class="font-bold">GPS:<span class="font-thin">${phone?.others?.GPS}</span></p>
    `
    console.log(phone)

    show_details_modal.showModal();

}