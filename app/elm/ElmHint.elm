module ElmHint exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


main =
    Html.beginnerProgram
        { model = model
        , view = view
        , update = update
        }



-- MODEL


type alias Model =
    Int


model : Model
model =
    0



-- UPDATE


type Msg
    = NoOp


update : Msg -> Model -> Model
update msg model =
    model



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "hint" ]
        [ text "Feel free to spawn cells, kill cells, change the size, or change the speed while it's running. Lighter blue cells are older. Enjoy!"
        ]
