const foramPost = async () => {
   const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
   const data = await res.json();
   const post = data.posts; 
   displayPosts(post);
}

const LatestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const latestpost = data;
    displayLatestPosts(latestpost);
 }

const displayPosts = post =>{
    const postContainer = document.getElementById('post-container');
    postContainer.textContent = '';

    post.forEach(post =>{
        const bg = post.isActive? 'green':'red';
        //    onOffline(post);
            const postCard = document.createElement('div');
            postCard.classList = `card card-side  shadow-xl flex flex-row  p-5 justify-start-start w-full bg-violet-100 mb-5`;
            postCard.innerHTML = `<div><div class="avatar"><div id="${post.id}"><div class="w-3 h-3 bg-${bg}-500 rounded-full z-40 absolute right-0"></div></div> <div class="w-16 h-16 rounded-xl">
                  <img src="${post.image}"/>
                </div>
              </div>
            </div> 
            <div class="ml-5 w-full">
            <div class="flex flex-row"><p class="mr-5">#${post.category}</p><p>Author: ${post.author.name}</p></div>
            <div class="font-bold text-xl">${post.title}</div>
            <div class="mb-3">${post.description}</div>
            <div class="flex flex-row justify-between border-t-2 border-dashed pt-4">
                <div class="flex flex-row">
                    <p class="flex flex-row items-center mr-3"><img class="h-5 w-5 mr-2" src="https://static.thenounproject.com/png/970795-200.png">${post.comment_count }</p>
                    <p class="flex flex-row items-center mr-3"><img class="h-5 w-5 mr-2" src="https://cdn.icon-icons.com/icons2/1660/PNG/512/3844476-eye-see-show-view-watch_110339.png">${post.view_count}</p>
                    <p class="flex flex-row items-center mr-3"><img class="h-5 w-5 mr-2" src="https://cdn-icons-png.freepik.com/512/3239/3239945.png">${post.posted_time}</p>
                </div>
                <div>
                    <img onclick="readBox('${post.id}')" class="h-5 w-5 mr-2" src="assets/rr.png">
                </div>
            </div>
        </div>
            `;
            postContainer.appendChild(postCard);
        }
    );
    
}

const displayLatestPosts = latestpost =>{
    const latestPostContainer = document.getElementById('latest-post-container');
    latestPostContainer.textContent = '';
    latestpost.forEach(latestpost =>{
            const postCard = document.createElement('div');
            postCard.classList = `w-96 bg-base-100 rounded-[20px] shadow-xl p-5 border mb-3 h-[480px] flex flex-col justify-between`;
            postCard.innerHTML = `
            <div>
                <img class="rounded-xl" src="${latestpost.cover_image}" alt="Shoes" />
                <div class="mt-3">
                    <p class="flex flex-row items-center"><img class="w-5 h-5 mr-4" src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-18/calendar-295.png" alt="">${latestpost.author.posted_date ? latestpost.author.posted_date : 'No publish date' }
                    </p>
                    <h2 class="card-title my-2">${latestpost.title}</h2>
                    <p class="mb-2">${latestpost.description}</p>
                </div>
            </div>
            <div class="flex flex-row">
            <div class="avatar mr-4">
                    <div class="w-12 rounded-full">
                      <img src="${latestpost.profile_image}" alt="Tailwind-CSS-Avatar-component" />
                    </div>
                  </div>
                <div>
                    <p>${latestpost.author.name}</p>
                    <p>${latestpost.author.designation ? latestpost.author.designation : 'Unknown'}</p>
                  </div>
              </div>
    
             
            </div>
            `;
            latestPostContainer.appendChild(postCard);

        }
    );
    toggleLoadingSpinner(false);
}

async function searchQuery(){
    const query = document.getElementById('query').value;
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${query}`);
    const data = await response.json();
    const post = data.posts; 
    displayPosts(post);
}
    


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

const readBox = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/post/${id}`);
    const data = await res.json();
   
    const readpost = data;
    // console.log(phone);
    showReadDetails(readpost);
}

const showReadDetails = readpost => {
    readCounter()
     addNewDiv(readpost);  
}

function addNewDiv(readpost) {
    const postContainer = document.getElementById('read-box');
    const newDiv = document.createElement('div');
    newDiv.classList = `bg-white flex flex-row m-3 rounded-xl p-2 justify-between`;
   
    newDiv.innerHTML = `<div class="w-2/3">${readpost.title}</div>
            <div> <p class="flex flex-row  items-center mr-3"><img class="h-5 w-5 mr-2" src="https://cdn.icon-icons.com/icons2/1660/PNG/512/3844476-eye-see-show-view-watch_110339.png">${readpost.view_count}</p></div>
            </div>
     `;
    postContainer.appendChild(newDiv);
  };

function readCounter() {
    const div = document.getElementById("read-box");
const childCount = div.childElementCount;
console.log("Number of child elements:", childCount+1);
const rCounter = childCount+1;
const countContainer = document.getElementById('read-Cunter');
countContainer.textContent = rCounter;
};
// function onOffline(post) {
//     console.log(`Post ID: ${post.id}`); 
//   const test2 = `${post.id}` ;
//     const element = document.getElementById(test2);
//     if (!element) {
//       console.error(`Element with ID  not found.`);
//       return; 
//     }
//     const classList = element.classList; 
//     console.log("Classes of the element:", classList);
//   }
toggleLoadingSpinner(true);
setTimeout(() => {
    foramPost();
    LatestPost();
   
  }, 2000);
