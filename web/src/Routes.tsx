// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Animals" titleTo="animals" buttonLabel="New Animal" buttonTo="newAnimal">
        <Route path="/animals/new" page={AnimalNewAnimalPage} name="newAnimal" />
        <Route path="/animals/{id:Int}/edit" page={AnimalEditAnimalPage} name="editAnimal" />
        <Route path="/animals/{id:Int}" page={AnimalAnimalPage} name="animal" />
        <Route path="/animals" page={AnimalAnimalsPage} name="animals" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Zoos" titleTo="zoos" buttonLabel="New Zoo" buttonTo="newZoo">
        <Route path="/zoos/new" page={ZooNewZooPage} name="newZoo" />
        <Route path="/zoos/{id:Int}/edit" page={ZooEditZooPage} name="editZoo" />
        <Route path="/zoos/{id:Int}" page={ZooZooPage} name="zoo" />
        <Route path="/zoos" page={ZooZoosPage} name="zoos" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
