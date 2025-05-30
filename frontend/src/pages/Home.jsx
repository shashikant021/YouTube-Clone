import VideoCard from "../components/VideoCard";

function Home() {
  const categories = [
    "All",
    "Programming",
    "Movies",
    "Music",
    "Gaming",
    "Education",
  ];

  const dummyVideos = [
    {
      _id: "1",
      title: "Learn React in 30 Minutes",
      thumbnailUrl:
        "https://wallpapers.com/images/hd/programming-2000-x-2000-picture-tc971v23hrzictxm.jpg",
      uploader: { username: "CodeMaster" },
      views: 15000,
    },
    {
      _id: "2",
      title: "JavaScript Basics for Beginners",
      thumbnailUrl:
        "https://images.vectorhq.com/images/istock/previews/9585/95851417-young-programmer-coding-a-new-project.jpg",
      uploader: { username: "DevGuru" },
      views: 8000,
    },
    {
      _id: "3",
      title: "Learn React in 30 Minutes",
      thumbnailUrl:
        "https://wallpapers.com/images/hd/programming-2000-x-2000-picture-tc971v23hrzictxm.jpg",
      uploader: { username: "CodeMaster" },
      views: 15000,
    },
    {
      _id: "4",
      title: "JavaScript Basics for Beginners",
      thumbnailUrl:
        "https://images.vectorhq.com/images/istock/previews/9585/95851417-young-programmer-coding-a-new-project.jpg",
      uploader: { username: "DevGuru" },
      views: 8000,
    },
    {
      _id: "5",
      title: "Learn React in 30 Minutes",
      thumbnailUrl:
        "https://wallpapers.com/images/hd/programming-2000-x-2000-picture-tc971v23hrzictxm.jpg",
      uploader: { username: "CodeMaster" },
      views: 15000,
    },
    {
      _id: "6",
      title: "JavaScript Basics for Beginners",
      thumbnailUrl:
        "https://images.vectorhq.com/images/istock/previews/9585/95851417-young-programmer-coding-a-new-project.jpg",
      uploader: { username: "DevGuru" },
      views: 8000,
    },
  ];

  return (
    <div className="flex">
      <main className="flex-1 p-4 ml-0 md:ml-48">
        <div className="flex justify-evenly gap-2 overflow-x-auto mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-1 text-sm rounded-full bg-gray-200 hover:bg-gray-400 hover:font-bold"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dummyVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
