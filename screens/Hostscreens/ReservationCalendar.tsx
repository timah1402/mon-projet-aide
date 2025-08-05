import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Modal } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

interface Reservation {
  id: string;
  name: string;
  listing: string;
  dates: string;
  startDate: Date;
  endDate: Date;
  status: 'accepted' | 'pending' | 'refused';
}

export default function ReservationCalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 6, 1)); // Juillet 2024
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const params = useLocalSearchParams();

  useEffect(() => {
    // Récupérer les données des réservations depuis les paramètres
    if (params.reservationsData) {
      try {
        const data = JSON.parse(params.reservationsData as string);
        // Reconstituer les objets Date
        const formattedData = data.map((item: any) => ({
          ...item,
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
        }));
        setReservations(formattedData);
      } catch (error) {
        console.error('Erreur lors du parsing des données:', error);
        // Données par défaut en cas d'erreur
        setReservations([
          {
            id: '1',
            name: 'Fatou Ndiaye',
            listing: 'Chambre froide Port',
            dates: '3 au 6 juillet',
            startDate: new Date(2024, 6, 3),
            endDate: new Date(2024, 6, 6),
            status: 'pending',
          },
          {
            id: '2',
            name: 'Aliou Ba',
            listing: 'Espace Almadies',
            dates: '10 au 12 juillet',
            startDate: new Date(2024, 6, 10),
            endDate: new Date(2024, 6, 12),
            status: 'accepted',
          },
          {
            id: '3',
            name: 'Moussa Diallo',
            listing: 'Entrepôt Pikine',
            dates: '15 au 18 juillet',
            startDate: new Date(2024, 6, 15),
            endDate: new Date(2024, 6, 18),
            status: 'pending',
          },
          {
            id: '4',
            name: 'Awa Seck',
            listing: 'Chambre froide Port',
            dates: '5 au 8 juillet',
            startDate: new Date(2024, 6, 5),
            endDate: new Date(2024, 6, 8),
            status: 'refused',
          },
        ]);
      }
    }
  }, [params.reservationsData]);

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  // Générer les jours du mois
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDateObj = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDateObj));
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    return days;
  };

  // Vérifier si une date a des réservations
  const getReservationsForDate = (date: Date) => {
    return reservations.filter(reservation => {
      const dateTime = date.getTime();
      const startTime = reservation.startDate.getTime();
      const endTime = reservation.endDate.getTime();
      return dateTime >= startTime && dateTime <= endTime;
    });
  };

  // Obtenir la couleur de statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'refused': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Navigation entre les mois
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  // Sélecteur d'année et mois
  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const selectMonthYear = (year: number, month: number) => {
    setCurrentDate(new Date(year, month, 1));
    setShowDatePicker(false);
    setSelectedDate(null);
  };

  // Générer les années (2020-2030)
  const generateYears = () => {
    const years = [];
    for (let year = 2020; year <= 2030; year++) {
      years.push(year);
    }
    return years;
  };

  const calendarDays = generateCalendarDays();
  const selectedDateReservations = selectedDate ? getReservationsForDate(selectedDate) : [];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-4 py-4 bg-white border-b border-gray-200`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={tw`text-lg font-bold`}>Calendrier des réservations</Text>
        </View>
      </View>

      <ScrollView style={tw`flex-1`}>
        {/* Navigation mois avec sélecteur de date */}
        <View style={tw`flex-row items-center justify-between px-4 py-4`}>
          <TouchableOpacity onPress={goToPreviousMonth} style={tw`p-2`}>
            <Ionicons name="chevron-back" size={24} color="#2563eb" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={openDatePicker}
            style={tw`flex-row items-center bg-blue-50 px-4 py-2 rounded-lg`}
          >
            <Text style={tw`text-xl font-bold text-gray-800 mr-2`}>
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#2563eb" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={goToNextMonth} style={tw`p-2`}>
            <Ionicons name="chevron-forward" size={24} color="#2563eb" />
          </TouchableOpacity>
        </View>



        {/* Jours de la semaine */}
        <View style={tw`flex-row px-4 mb-2`}>
          {daysOfWeek.map((day) => (
            <View key={day} style={tw`flex-1 items-center py-2`}>
              <Text style={tw`text-sm font-semibold text-gray-600`}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendrier */}
        <View style={tw`px-4`}>
          {Array.from({ length: 6 }, (_, weekIndex) => (
            <View key={weekIndex} style={tw`flex-row mb-1`}>
              {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((date, dayIndex) => {
                const dayReservations = getReservationsForDate(date);
                const isCurrentMonth = isSameMonth(date);
                const isSelectedDate = selectedDate?.toDateString() === date.toDateString();
                
                return (
                  <TouchableOpacity
                    key={dayIndex}
                    style={tw`flex-1 aspect-square items-center justify-center m-0.5 rounded-lg ${
                      isSelectedDate ? 'bg-blue-500' : 
                      isToday(date) ? 'bg-blue-100' : 
                      'bg-gray-50'
                    }`}
                    onPress={() => setSelectedDate(date)}
                  >
                    <Text style={tw`text-sm font-medium ${
                      isSelectedDate ? 'text-white' :
                      !isCurrentMonth ? 'text-gray-400' :
                      isToday(date) ? 'text-blue-600' :
                      'text-gray-800'
                    }`}>
                      {date.getDate()}
                    </Text>
                    
                    {/* Indicateurs de réservations */}
                    {dayReservations.length > 0 && (
                      <View style={tw`flex-row mt-1`}>
                        {dayReservations.slice(0, 3).map((reservation, index) => (
                          <View
                            key={index}
                            style={tw`w-1.5 h-1.5 rounded-full mx-0.5 ${getStatusColor(reservation.status)}`}
                          />
                        ))}
                        {dayReservations.length > 3 && (
                          <Text style={tw`text-xs text-gray-600 ml-1`}>+{dayReservations.length - 3}</Text>
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Légende */}
        <View style={tw`px-4 py-4 border-t border-gray-200 mt-4`}>
          <Text style={tw`text-sm font-semibold text-gray-800 mb-3`}>Légende :</Text>
          <View style={tw`flex-row flex-wrap`}>
            <View style={tw`flex-row items-center mr-6 mb-2`}>
              <View style={tw`w-3 h-3 rounded-full bg-green-500 mr-2`} />
              <Text style={tw`text-sm text-gray-600`}>Acceptée</Text>
            </View>
            <View style={tw`flex-row items-center mr-6 mb-2`}>
              <View style={tw`w-3 h-3 rounded-full bg-yellow-500 mr-2`} />
              <Text style={tw`text-sm text-gray-600`}>En attente</Text>
            </View>
            <View style={tw`flex-row items-center mr-6 mb-2`}>
              <View style={tw`w-3 h-3 rounded-full bg-red-500 mr-2`} />
              <Text style={tw`text-sm text-gray-600`}>Refusée</Text>
            </View>
          </View>
        </View>

        {/* Détails du jour sélectionné */}
        {selectedDate && (
          <View style={tw`px-4 py-4 border-t border-gray-200`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>
              {selectedDate.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            
            {selectedDateReservations.length > 0 ? (
              selectedDateReservations.map((reservation) => (
                <View key={reservation.id} style={tw`bg-gray-100 rounded-xl p-4 mb-3`}>
                  <View style={tw`flex-row justify-between items-center mb-2`}>
                    <View style={tw`flex-row items-center`}>
                      <MaterialIcons name="person" size={18} color="#2563eb" style={tw`mr-2`} />
                      <Text style={tw`font-semibold text-base`}>{reservation.name}</Text>
                    </View>
                    <View style={tw`px-3 py-1 rounded-full ${
                      reservation.status === 'accepted' ? 'bg-green-200' :
                      reservation.status === 'pending' ? 'bg-yellow-200' :
                      'bg-red-200'
                    }`}>
                      <Text style={tw`text-xs font-semibold ${
                        reservation.status === 'accepted' ? 'text-green-800' :
                        reservation.status === 'pending' ? 'text-yellow-800' :
                        'text-red-800'
                      }`}>
                        {reservation.status === 'accepted' ? 'Acceptée' :
                         reservation.status === 'pending' ? 'En attente' : 'Refusée'}
                      </Text>
                    </View>
                  </View>
                  <Text style={tw`text-sm text-gray-700 mb-1`}>
                    🏠 {reservation.listing}
                  </Text>
                  <Text style={tw`text-sm text-gray-700`}>
                    📅 {reservation.dates}
                  </Text>
                </View>
              ))
            ) : (
              <View style={tw`items-center py-8`}>
                <Ionicons name="calendar-outline" size={48} color="#9CA3AF" />
                <Text style={tw`text-gray-500 text-center mt-2`}>
                  Aucune réservation pour cette date
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Modal de sélection de date */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-xl p-6 mx-4 max-h-96`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-lg font-bold`}>Sélectionner une date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Ionicons name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={tw`max-h-80`}>
              {generateYears().map((year) => (
                <View key={year} style={tw`mb-4`}>
                  <Text style={tw`text-base font-semibold text-gray-800 mb-2`}>{year}</Text>
                  <View style={tw`flex-row flex-wrap`}>
                    {months.map((month, monthIndex) => (
                      <TouchableOpacity
                        key={`${year}-${monthIndex}`}
                        style={tw`w-1/4 p-2 m-1 bg-gray-100 rounded-lg items-center ${
                          year === currentDate.getFullYear() && monthIndex === currentDate.getMonth()
                            ? 'bg-blue-500'
                            : ''
                        }`}
                        onPress={() => selectMonthYear(year, monthIndex)}
                      >
                        <Text style={tw`text-xs font-medium ${
                          year === currentDate.getFullYear() && monthIndex === currentDate.getMonth()
                            ? 'text-white'
                            : 'text-gray-700'
                        }`}>
                          {month.substring(0, 3)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}