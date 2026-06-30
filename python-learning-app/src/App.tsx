import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { DayPage } from './pages/DayPage';
import { PracticePage } from './pages/PracticePage';
import { useProgress } from './hooks/useProgress';

function App() {
  const {
    progress,
    completeProblem,
    uncompleteProblem,
    getCompletedCountForDay,
    totalCompleted,
  } = useProgress();

  return (
    <HashRouter>
      <Layout
        totalCompleted={totalCompleted}
        getCompletedCountForDay={getCompletedCountForDay}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                progress={progress}
                totalCompleted={totalCompleted}
                getCompletedCountForDay={getCompletedCountForDay}
              />
            }
          />
          <Route
            path="/day/:dayId"
            element={
              <DayPage
                progress={progress}
                completeProblem={completeProblem}
                uncompleteProblem={uncompleteProblem}
                getCompletedCountForDay={getCompletedCountForDay}
              />
            }
          />
          <Route
            path="/practice/:dayId"
            element={
              <PracticePage
                progress={progress}
                completeProblem={completeProblem}
                uncompleteProblem={uncompleteProblem}
                getCompletedCountForDay={getCompletedCountForDay}
              />
            }
          />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
