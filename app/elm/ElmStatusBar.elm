port module ElmStatusBar exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class, disabled)
import Html.Events exposing (onClick)
import Result exposing (..)


port actionCreator : String -> Cmd msg


port getGen : (Int -> msg) -> Sub msg


main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


init : ( Model, Cmd Msg )
init =
    ( Model 0 True, Cmd.none )


type alias Model =
    { generation : Int
    , running : Bool
    }


model : Model
model =
    Model 0 True



-- UPDATE


type Msg
    = ToggleRun
    | NextGen
    | SetGen Int
    | SendAction Action


type Action
    = NewGame
    | ClearBoard


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ToggleRun ->
            ( { model | running = (not model.running) }, actionCreator "toggleRun" )

        NextGen ->
            ( model, actionCreator "nextGen" )

        SetGen gen ->
            ( { model | generation = gen }, Cmd.none )

        SendAction action ->
            case action of
                NewGame ->
                    ( model, actionCreator "newGame" )

                ClearBoard ->
                    ( model, actionCreator "clearBoard" )



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "bar bar--status" ]
        [ button
            [ class "start btn--status"
            , onClick ToggleRun
            ]
            [ text
                (if model.running then
                    "Pause"
                 else
                    "Start"
                )
            ]
        , button
            [ class
                (if model.running then
                    "btn--status btn--disabled"
                 else
                    "btn--status"
                )
            , disabled model.running
            , onClick (SendAction ClearBoard)
            ]
            [ text "Clear" ]
        , button
            [ class "btn--status"
            , onClick (SendAction NewGame)
            ]
            [ text "New Game" ]
        , div [ class "spacer" ] []
        , button
            [ class
                (if model.running then
                    "btn--disabled"
                 else
                    ""
                )
            , onClick NextGen
            , disabled model.running
            ]
            [ text "Next Gen" ]
        , div [ class "gen-counter" ]
            [ text ("Gen: " ++ toString model.generation) ]
        ]


subscriptions : Model -> Sub Msg
subscriptions model =
    getGen SetGen
