// export async function getServerSideProps() {
//   const res = await fetch('http://localhost:3333/episodes')
//   const data = await res.json()

//   return { props: { episodes: data } }
// }

export async function getStaticProps() {
  const res = await fetch('http://localhost:3333/episodes')
  const data = await res.json()

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  }
}

export default function Home(props: any) {

  console.log(props);

  return (
    <div>
      <h1>Home</h1>
      {
        props.episodes?.map((item: any) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))
      }
    </div>
  )
}
