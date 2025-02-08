import { ModalContainer, PhysioData } from "./components";
import colors, { createGradient } from "./../../constants/colors";
import {
  Column,
  Name,
  PokeProfile,
  Row,
  StatsTitle,
  TypeMarker,
  PokeCode,
  Overlay,
  CloseButton,
  Button,
} from "../common";
import Stats from "../stats";
import GraphData from "../graphData";
import { useContext, useEffect, useState, useCallback } from "react";
import { modalContext } from "../../contexts/modalContext";
import icons from "../../constants/icons";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import AudioPlayer from "./../audioPlayer/index";
import types from "./../../constants/types";
import CapturedInfo from "./components/capturedInfo";
import { accountContext } from "./../../contexts/accountContext";
import Loading from "../loading";
import { toastContext } from "./../../contexts/toastContext";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const PokeModal = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { modal, data: modalData, setModal } = useContext(modalContext);
  const { accountData, setAccountData } = useContext(accountContext);
  const { setToast } = useContext(toastContext);
  const [color, setColor] = useState();
  const [weaknesses, setWeaknesses] = useState([]);
  const [profileTop, setProfileTop] = useState();
  const [loading, setLoading] = useState(false);

  const getProfileTop = () => {
    const width = window.innerWidth;
    // Define breakpoints and logic here...
  };

  const formatOrder = (order) => {
    if (order < 10) {
      return `00${order}`;
    } else if (order < 100) {
      return `0${order}`;
    } else {
      return order;
    }
  };

  const getColor = useCallback(() => {
    const pokeType = modalData?.types[0];
    setColor(colors.types[pokeType?.type?.name]);
  }, [modalData]);

  const getWeaknesses = useCallback(() => {
    modalData?.types.map((item) => {
      const type = types[item.type.name];
      setWeaknesses([...type.weakness]);
    });
  }, [modalData]);

  const capturePokemon = async (userId, pokemonName, speciesUrl) => {
    const conn = new HubConnectionBuilder()
      .withUrl("https://www.pokedexneaime.store/pokemonHub")
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    await conn.start();
    await conn.invoke("CapturePokemon", {
      userId: parseInt(userId),
      pokemonName: pokemonName,
      pokemonUrl: `https://pokeapi.co/api/v2/pokemon/${speciesUrl}/`,
    });
  };

  const tryCapturePokemon = async () => {
    if (accountData.isLogged) {
      setLoading(true);
      try {
        await capturePokemon(accountData.user.id, modalData.name, modalData.id);
      } catch (error) {
        console.error(error);
        setToast({
          open: true,
          title: "Ops!",
          message: "Something went wrong! Try again later.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setAccountData((prev) => ({
        ...prev,
        modalOpen: true,
      }));
    }
  };

  useEffect(() => {
    getColor();
    getWeaknesses();
    getProfileTop();
  }, [modalData, getColor, getWeaknesses]);

  if (!modal) return null;

  if (loading) {
    return (
      <Overlay>
        <ModalContainer
          bg={createGradient(color, colors.blue[900])}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Loading />
        </ModalContainer>
      </Overlay>
    );
  }

  return (
    <Overlay
      onClick={() => {
        setModal(false);
      }}
    >
      <ModalContainer
        bg={createGradient(color, colors.blue[900])}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseButton
          className="fa-solid fa-circle-xmark"
          onClick={() => {
            setModal(false);
          }}
        ></CloseButton>

        <PokeProfile
          src={modalData?.sprites?.other?.["official-artwork"]?.front_default}
          style={{
            top: profileTop,
          }}
        />
        <Name marginTop={desktop ? "30%" : "25%"}>
          ● {modalData.name.replaceAll("-", " ")} ●
        </Name>
        <PokeCode>#{formatOrder(modalData?.order)}</PokeCode>

        <PhysioData>
          <Stats
            icon={"ruler"}
            name={"Altura"}
            value={modalData?.height}
            unit={"m"}
          />
          <Row>
            {modalData?.types.map((item, index) => {
              return (
                <TypeMarker
                  key={index} // Add a unique key here
                  bg={colors.types[item.type.name]}
                  rounded={true}
                >
                  <img src={icons[item.type.name]} />
                </TypeMarker>
              );
            })}
          </Row>
          <Stats
            icon={"weight"}
            name={"Peso"}
            value={modalData?.weight}
            unit={"Kg"}
          />
        </PhysioData>

        <Column width={"95%"} justify={"flex-end"} gap={"16px"}>
          <Row width={"100%"} align={"flex-start"}>
            <Column width={"50%"} align={"flex-start"}>
              <StatsTitle>
                <i className="fa-solid fa-chart-simple"></i> Base Stats
              </StatsTitle>
              <GraphData
                icon={"heart-pulse"}
                value={modalData?.stats[0].base_stat}
                maxValue={"100"}
              />
              {/* Other GraphData components here */}
            </Column>

            <Column width={"50%"} gap={"16px"} height={"100%"}>
              <Column width={"100%"} align={"flex-start"}>
                <StatsTitle>
                  <i className="fa-solid fa-star"></i> Abilities
                </StatsTitle>
                <Row
                  width={"100%"}
                  justify={"flex-start"}
                  gap={"8px"}
                  style={{
                    flexWrap: "wrap",
                  }}
                >
                  {modalData?.abilities.map((item, index) => {
                    return (
                      <Row gap={"4px"} width={"max-content"} key={index}> {/* Add key */}
                        <i
                          className="fa-regular fa-circle"
                          style={{
                            color: colors.gray[400],
                            fontSize: "8px",
                          }}
                        ></i>
                        <p>{item.ability.name}</p>
                      </Row>
                    );
                  })}
                </Row>
              </Column>
            </Column>
          </Row>

          {modalData?.captured && (
            <CapturedInfo
              name={modalData?.captured?.username}
              date={modalData?.captured?.capturedAt}
            />
          )}

          {!modalData?.captured && (
            <Button
              style={{ width: "100%", marginBottom: "8px" }}
              onClick={tryCapturePokemon}
              disabled={loading}
            >
              Capture this Pokémon
            </Button>
          )}
        </Column>
      </ModalContainer>
    </Overlay>
  );
};

export default PokeModal;
