export default function Dashboard() {
  const cards = [
    {
      title: "Users",
      value: 245,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.2 0-9.5 1.6-9.5 4.9v2.5h19v-2.5c0-3.3-6.3-4.9-9.5-4.9z" />
        </svg>
      ),
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Memberships",
      value: 58,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M20 6H4c-1.1 0-2 .9-2 2v1h20V8c0-1.1-.9-2-2-2zm0 4H2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8zm-9 7H5v-2h6v2z" />
        </svg>
      ),
      gradient: "from-green-400 to-emerald-600",
    },
    {
      title: "Feedbacks",
      value: 104,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M4 4h16v12H5.17L4 17.17V4zm0-2c-1.1 0-2 .9-2 2v20l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4z" />
        </svg>
      ),
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      title: "Testimonials",
      value: 33,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ),
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map(({ title, value, svg, gradient }) => (
        <div
          key={title}
          className={`rounded-xl p-5 shadow-lg text-white bg-gradient-to-r ${gradient} flex items-center justify-between`}
        >
          <div>
            <div className="text-sm opacity-90 font-medium">{title}</div>
            <div className="text-3xl font-bold">{value}</div>
          </div>
          <div className="p-3 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {svg}
          </div>
        </div>
      ))}
    </div>
  );
}
