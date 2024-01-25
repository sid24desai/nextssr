// pages/index.tsx
import React from "react";
import Image from "next/image";

interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
}

interface HomeProps {
  data: User[];
}

export default function Home({ data }: HomeProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Next.js Starter</h1>

      {data ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Fetched Data:</h2>
          <div className="grid grid-cols-3 gap-4">
            {data.map((user) => (
              <div key={user.id} className="border p-4 rounded">
                <Image
                  src={user.avatar}
                  alt={`Avatar of ${user.first_name} ${user.last_name}`}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <p className="text-center mt-2">
                  {user.first_name} {user.last_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  const res = await fetch(`https://reqres.in/api/users?page=1&per_page=3`);
  const { data } = await res.json();

  return { props: { data } };
}

