import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Perrito } from "./Perrito";

// Simula fetch para que devuelva siempre la misma imagen
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        url: "https://random.dog/e3cc388e-5bff-488d-9202-67c360680422.JPG",
      }),
  })
);

//La función beforeEach se llamará antes de cada test, esta a su vez llamará a
//vi.clearAllMocks(); que restablece cualquier mock a su estado original.
describe("Perrito Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  //Primer test
  test("Debe renderizar el componente correctamente", async () => {
    render(<Perrito />);

    //Verifica que se muestra el texto Guau?... en lo que espera por una imagen
    expect(screen.getByText("Guau?...")).toBeInTheDocument();

    //Espera que la imagen se cargue y verifica que aparece en el DOM
    const image = await screen.findByRole("img");
    expect(image).toBeInTheDocument();

    //Espera encontrar un botón con el texto "Más perros!"
    expect(screen.getByRole("button", { name: /más perros!/i })).toBeInTheDocument();
  });

  //Segundo test
  test("Debe cambiar la imagen al hacer clic en el botón", async () => {
    render(<Perrito />);

    //Espera la primera imagen
    await screen.findByRole("img");

    //Simula una nueva respuesta de la API con otra imagen fetch.mockResolvedValueOnce 
    //modifica la respuesta de fetch solo una vez con la url que le proporcionamos
    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          url: "https://random.dog/165a3967-976c-4304-81d5-5a76f4e9b8d2.jpg",
        }),
    });

  
    //Busca el botón que tiene el texto "Más perros!"
    const button = screen.getByRole("button", { name: /más perros!/i });
    //Simula interacción con el botón
    fireEvent.click(button);

    //Espera a la nueva imagen que supuestamente ha generado el botón
    const newImage = await screen.findByRole("img");
    //Cuando la devuelva verifica que el atributo src de la misma contiene la url que indicamos en fetch.mockResolvedValueOnce
    expect(newImage).toHaveAttribute("src", "https://random.dog/165a3967-976c-4304-81d5-5a76f4e9b8d2.jpg");
  });
});
