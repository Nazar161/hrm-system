import { Link, createFileRoute } from '@tanstack/react-router';

import { useQuery } from 'urql';
import { HomePageQuery } from '../../api/graphql/HomePageQuery';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import VacancyCard from '@/components/cards/vacancyCard';
import CandidateCard from '@/components/cards/candidateCard';
import ApplicationCard from '@/components/cards/applicationCard';

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
});

function Index() {
  const [{ data, fetching, error }] = useQuery({ query: HomePageQuery, variables: { last: 10 } });

  if (!data) {
    return <div>Данные не загружены</div>;
  }

  if (fetching) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Ошибка</div>;
  }

  return (
    <div>
      <h2 className="mt-8 pb-2 text-3xl font-semibold tracking-tight">Главная страница</h2>
      <div className="ustify-center relative flex w-full flex-col items-center">
        <div className="relative mb-2 mt-8 flex w-full  max-w-[90%] flex-col-reverse items-center justify-center md:flex-row">
          <Link to="/vacancy/create" className="static md:absolute md:left-1 md:top-0">
            <Button>Создать вакансию</Button>
          </Link>
          <h2 className="text-3xl font-semibold tracking-tight">Вакансии</h2>
        </div>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-[90%]"
        >
          <CarouselContent>
            {data.vacancies.map((vacancy) => {
              return (
                <CarouselItem className="w-full md:w-2/3 lg:w-3/5 xl:w-auto xl:basis-1/3lg:w-3/5 xl:w-auto xl:basis-1/3" key={vacancy.id}>
                  <VacancyCard
                    id={vacancy.id}
                    title={vacancy.title}
                    description={vacancy.description}
                    minSalary={vacancy.minSalary}
                    maxSalary={vacancy.maxSalary}
                    key={vacancy.id}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
        <div className="relative mb-2 mt-8 flex w-full  max-w-[90%] flex-col-reverse items-center justify-center md:flex-row">
          <Link to="/candidate/create" className="static md:absolute md:left-1 md:top-0">
            <Button>Добавить нового кандидата</Button>
          </Link>
          <h2 className="text-3xl font-semibold tracking-tight">Кандидаты</h2>
        </div>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-[90%]"
        >
          <CarouselContent>
            {data.candidates.map((candidate) => {
              return (
                <CarouselItem className="w-full md:w-2/3 lg:w-3/5 xl:w-auto xl:basis-1/3" key={candidate.id}>
                  <CandidateCard
                    id={candidate.id}
                    firstName={candidate.firstName}
                    lastName={candidate.lastName}
                    position={candidate.position}
                    email={candidate.email}
                    phone={candidate.phone}
                    key={candidate.id}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
        <h2 className="mt-8 pb-2 text-3xl font-semibold tracking-tight">Отклики</h2>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-[90%]"
        >
          <CarouselContent>
            {data.applications.map((application) => {
              return (
                <CarouselItem className="w-full md:w-2/3 lg:w-3/5 xl:w-auto xl:basis-1/3" key={application.id}>
                  <ApplicationCard
                    id={application.id}
                    vacancyId={application.vacancy.id}
                    vacancyTitle={application.vacancy.title}
                    vacancyMinSalary={application.vacancy.minSalary}
                    vacancyMaxSalary={application.vacancy.maxSalary}
                    candidateId={application.candidate.id}
                    candidateFirstName={application.candidate.firstName}
                    candidateLastName={application.candidate.lastName}
                    candidatePosition={application.candidate.position}
                    key={application.id}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      </div>
    </div>
  );
}
